import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ModelWidget, WidgetBase } from '@runejs/filestore';
import { Vector2 } from 'three';
import { ModelFilePreviewService } from '../../file-preview/model-file-preview/model-file-preview.service';
import { FilestoreService } from '../../../filestore/filestore.service';
import { MathHelperService } from '../../services/math-helper.service';

@Component({
  selector: 'rs-model-widget',
  templateUrl: './model-widget.component.html',
  styleUrls: ['./model-widget.component.scss']
})
export class ModelWidgetComponent implements OnInit, OnChanges, OnDestroy {
    @Input() widget: ModelWidget;
    @Input() parentWidget: WidgetBase;
    @Input() modelRenderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;

    constructor(
        private mathHelperService: MathHelperService,
        private filestoreService: FilestoreService,
        private modelPreview: ModelFilePreviewService
    ) { }

    ngOnInit(): void {
        if (this.modelRenderer && this.widget.modelId !== -1) {
            this.createScene();
            this.drawModel();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.modelRenderer && !changes?.modelRenderer.firstChange && this.widget.modelId !== -1) {
            this.createScene();
            this.drawModel();
        }
    }

    ngOnDestroy(): void {
        if (this.modelRenderer && this.scene) {
            this.modelRenderer.clear();
        }
    }

    createScene() {
        this.scene = new THREE.Scene();

        const viewportSize = this.modelRenderer.getSize(new Vector2());
        // 50-52 FOV seems to be perfect for RS models
        this.camera = new THREE.PerspectiveCamera(
            52, viewportSize.width / viewportSize.height, 0.1, 500
        );

        const sineTable = this.mathHelperService.getSineTable();
        const cosineTable = this.mathHelperService.getCosineTable();

        // Standardize RS model attributes
        const camHeight = sineTable[this.widget.rotationX] * this.widget.modelZoom * ModelFilePreviewService.MODEL_SCALE;
        const camDistance = cosineTable[this.widget.rotationX] * this.widget.modelZoom * ModelFilePreviewService.MODEL_SCALE;

        this.camera.position.z = camDistance;
        this.camera.position.y = camHeight;
        this.camera.rotateX(-this.mathHelperService.rotationToRadians(this.widget.rotationX));

        // TODO if the widget is scrollable, the models still show
        let containerOffsetX = 0;
        let containerOffsetY = 0;
        if (this.widget.parentId !== -1 && this.widget.parentId === this.parentWidget.id) {
            containerOffsetX = this.parentWidget.x;
            containerOffsetY = this.parentWidget.y;
        }

        // Find the center point of this widget's X and Y within the screen
        const offsetX = (viewportSize.width / 2) - (this.widget.x + (this.widget.width / 2)) - containerOffsetX;
        const offsetY = (viewportSize.height / 2) - (this.widget.y + (this.widget.height / 2)) - containerOffsetY;
        this.camera.setViewOffset(viewportSize.width, viewportSize.height, offsetX, offsetY, viewportSize.width, viewportSize.height);
        this.scene.add(this.camera);
    }

    drawModel() {
        // TODO handle mesh opacity
        const rsModel = this.filestoreService.filestore.modelStore.getModel(this.widget.modelId);
        const mesh = this.modelPreview.getMeshFromRsModel(rsModel, this.filestoreService.filestore.textureStore, this.filestoreService.filestore);

        // TODO objects are returned mirrored
        const scale = new THREE.Vector3(-1, 1, 1);
        mesh.scale.multiply(scale);

        // TODO if the top todo has been fixed, probably remove the minus sign from the next statement
        mesh.rotateY(-this.mathHelperService.rotationToRadians(this.widget.rotationY));

        this.scene.add(mesh);
        this.modelRenderer.autoClear = false;
        this.modelRenderer.render(this.scene, this.camera);
        this.modelRenderer.clearDepth();
    }
}
