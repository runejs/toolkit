import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import {
    ContainerWidget,
    LinkWidget,
    ModelWidget,
    ParentWidget,
    SpriteWidget,
    WidgetBase
} from '@runejs/filestore';

@Component({
    selector: 'rs-widget',
    templateUrl: './widget.component.html',
    styleUrls: [ './widget.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetComponent implements OnInit, OnChanges {
    @Input() public parentWidget: ParentWidget;
    @Input() public widget: WidgetBase;
    @Input() public hovering = false;
    @Input() public modelRenderer: THREE.WebGLRenderer;
    public isRoot = false;
    public isContainer = false;
    public isModel = false;
    public isInteractionSprite = false;

    // TODO maybe there is a way to find this out through some attribute? For now, hardcode them to show them on top
    private readonly INTERACTION_SPRITES = [308, 309, 535, 536, 537, 538, 539, 540, 541, 542, 543];

    public constructor() { }

    public ngOnInit(): void {
        this.initializeChildren();
    }

    initializeChildren() {
        this.isRoot = this.widget instanceof ParentWidget && this.widget.type == null;
        this.isContainer = this.widget instanceof ContainerWidget;
        this.isModel = this.widget instanceof ModelWidget && this.widget['modelId'] >= 0;
        this.isInteractionSprite = this.widget instanceof SpriteWidget && this.INTERACTION_SPRITES.indexOf(this.widget.spriteId) > -1;

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

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.widget && !changes.widget.firstChange) {
            this.initializeChildren();
        }
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
}
