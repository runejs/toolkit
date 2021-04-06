import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges, OnDestroy,
    OnInit,
    SimpleChanges
} from '@angular/core';
import {
    ContainerWidget,
    LinkWidget,
    ModelWidget,
    ParentWidget,
    SpritePack,
    SpriteWidget,
    WidgetBase
} from '@runejs/filestore';
import { FilestoreService } from '../../filestore/filestore.service';
import * as THREE from 'three';
import { ModelFilePreviewService } from '../file-preview/model-file-preview/model-file-preview.service';
import { MathHelperService } from './math-helper.service';
import { Vector2 } from 'three';


@Component({
    selector: 'rs-widget',
    templateUrl: './widget.component.html',
    styleUrls: [ './widget.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetComponent implements OnInit, OnChanges, OnDestroy {
    @Input() public parentWidget: ParentWidget;
    @Input() public widget: WidgetBase;
    @Input() public hovering = false;
    @Input() public modelRenderer: THREE.WebGLRenderer;
    public isRoot = false;
    public isContainer = false;
    public isModel = false;
    public isInteractionSprite = false;
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;

    // TODO maybe there is a way to find this out through some attribute? For now, hardcode them to show them on top
    private readonly INTERACTION_SPRITES = [309, 535, 536, 537, 538, 539, 540, 541, 542, 543];

    public constructor(
        private filestoreService: FilestoreService,
        private modelPreview: ModelFilePreviewService,
        private mathHelperService: MathHelperService
    ) { }

    public ngOnInit(): void {
        this.initializeChildren();
    }

    initializeChildren() {
        this.isRoot = this.widget instanceof ParentWidget && this.widget.type == null;
        this.isContainer = this.widget instanceof ContainerWidget;
        this.isModel = this.widget instanceof ModelWidget && this.widget['modelId'] >= 0;
        this.isInteractionSprite = this.widget instanceof SpriteWidget && this.INTERACTION_SPRITES.indexOf(this.widget.spriteId) > -1;

        if (this.isModel && this.modelRenderer) {
            this.createScene();
            this.drawModel();
        }

        // Only root and container needs initialization, since they might have children
        if (!this.isRoot && !this.isContainer) {
            return;
        }

        // Root component is not actually a widget, so set the type to -1
        if (this.isRoot) {
            this.widget.type = -1;
        }

        const parentWidgetChildren: WidgetBase[] = [...this.parentWidget.children];

        parentWidgetChildren.forEach(child => {
            if(child.parentId !== -1 && child.parentId !== this.widget.id) {
                const parent = parentWidgetChildren.find(widgetChild => widgetChild.id === child.parentId) as ParentWidget;
                if(!parent) {
                    console.error(`Invalid widget parent id: ${child.parentId}`);
                    return;
                }

                if(!parent.children) {
                    parent.children = [];
                }

                parent.children.push(child);
                this.parentWidget.children.splice(this.parentWidget.children.indexOf(child), 1);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.scene) {
            this.modelRenderer.clear();
        }
    }

    createScene() {
        const modelWidget = this.widget as ModelWidget;
        this.scene = new THREE.Scene();

        // TODO handle mesh opacity
        const viewportSize = this.modelRenderer.getSize(new Vector2());
        // 50-52 FOV seems to be perfect for RS models
        this.camera = new THREE.PerspectiveCamera(
            52, viewportSize.width / viewportSize.height, 0.1, 500
        );

        const sineTable = this.mathHelperService.getSineTable();
        const cosineTable = this.mathHelperService.getCosineTable();

        // Standardize RS model attributes
        const camHeight = sineTable[modelWidget.rotationX] * modelWidget.modelZoom * ModelFilePreviewService.MODEL_SCALE;
        const camDistance = cosineTable[modelWidget.rotationX] * modelWidget.modelZoom * ModelFilePreviewService.MODEL_SCALE;

        this.camera.position.z = camDistance;
        this.camera.position.y = camHeight;
        this.camera.rotateX(-this.mathHelperService.rotationToRadians(modelWidget.rotationX));

        // TODO if the widget is scrollable, the models still show
        let containerOffsetX = 0;
        let containerOffsetY = 0;
        if (this.widget.parentId !== -1 && this.widget.parentId === this.parentWidget.id) {
            containerOffsetX = this.parentWidget.x;
            containerOffsetY = this.parentWidget.y;
        }

        // Find the center point of this widget's X and Y within the screen
        const offsetX = (viewportSize.width / 2) - (modelWidget.x + (modelWidget.width / 2)) - containerOffsetX;
        const offsetY = (viewportSize.height / 2) - (modelWidget.y + (modelWidget.height / 2)) - containerOffsetY;
        this.camera.setViewOffset(viewportSize.width, viewportSize.height, offsetX, offsetY, viewportSize.width, viewportSize.height);

        this.scene.add(this.camera);
    }

    drawModel() {
        const modelWidget = this.widget as ModelWidget;
        const rsModel = this.filestoreService.filestore.modelStore.getModel(modelWidget.modelId);
        const mesh = this.modelPreview.getMeshFromRsModel(rsModel, this.filestoreService.filestore.textureStore, this.filestoreService.filestore);

        // TODO objects are returned mirrored
        const scale = new THREE.Vector3(-1, 1, 1);
        mesh.scale.multiply(scale);

        // TODO if the top todo has been fixed, probably remove the minus sign from the next statement
        mesh.rotateY(-this.mathHelperService.rotationToRadians(modelWidget.rotationY));

        this.scene.add(mesh);
        this.modelRenderer.autoClear = false;
        this.modelRenderer.render(this.scene, this.camera);
        this.modelRenderer.clearDepth();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.widget && !changes.widget.firstChange || changes?.modelRenderer && !changes?.modelRenderer.firstChange) {
            this.initializeChildren();
        }
    }

    public getBase64Text(fontId: number, text: string, color?: number, hoverColor?: number) {
        if (this.hovering && hoverColor) {
            return this.filestoreService.filestore.fontStore.getFontById(fontId).drawString(text, hoverColor)
        }

        return this.filestoreService.filestore.fontStore.getFontById(fontId).drawString(text, color);
    }

    public splitTextLines(text: string): string[] {
        return text.split(/\\n/);
    }

    public get styles(): Partial<CSSStyleDeclaration> {
        if (this.widget instanceof ParentWidget) {
            // Container styles
            return {
                width: '100%',
                height: '100%'
            }
        } else {
            // Everything else
            let style: Partial<CSSStyleDeclaration> = {
                top: this.widget.y + 'px',
                left: this.widget.x + 'px',
                width: this.widget.width + 'px',
                height: this.widget.height + 'px'
            }

            if (this.widget['scrollHeight'] && this.widget['scrollHeight'] > this.widget.height) {
                style.overflowY = 'auto';
                style.paddingRight = '16px';
            } else {
                style.overflowY = 'hidden';
            }

            if (this.widget['scrollWidth'] && this.widget['scrollWidth'] > this.widget.width) {
                style.overflowX = 'auto';
                style.paddingBottom = '16px';
            } else {
                style.overflowX = 'hidden';
            }

            // Remove div constraints from text widgets
            if (this.widget instanceof LinkWidget) {
                style.overflowX = 'visible';
                style.overflowY = 'visible';
            }

            return style;
        }
    }

    /* Gets the transform CSS value
    *  0 = align start (normal)
    *  1 = align center
    *  2 = align end
    */
    getTextAlignmentStyle(alignmentX: number, alignmentY: number) {
        const alignmentStyle: Partial<CSSStyleDeclaration> = {
            alignItems: null,
            justifyContent: null
        };

        if (alignmentX === 1) {
            alignmentStyle.alignItems = 'center';
        } else if (alignmentX === 2) {
            alignmentStyle.alignItems = 'flex-end';
        }

        if (alignmentY === 1) {
            alignmentStyle.justifyContent = 'center';
        } else if (alignmentY === 2) {
            alignmentStyle.justifyContent = 'flex-end';
        }

        return alignmentStyle;
    }
}
