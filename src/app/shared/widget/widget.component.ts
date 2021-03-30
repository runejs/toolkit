import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { ContainerWidget, LinkWidget, ParentWidget, WidgetBase } from '@runejs/filestore';
import { FilestoreService } from '../../filestore/filestore.service';


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
    @Input() public highlightWidgetsOnHover = false;

    public constructor(private filestoreService: FilestoreService) { }

    public ngOnInit(): void {
        this.initialize();
    }

    initialize() {
        if(!(this.widget instanceof ContainerWidget) && !(this.widget instanceof ParentWidget)) {
            return;
        }

        if (this.widget instanceof ParentWidget) {
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
            this.initialize();
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
            } else {
                style.overflowY = 'hidden';
            }

            if (this.widget['scrollWidth'] && this.widget['scrollWidth'] > this.widget.width) {
                style.overflowX = 'auto';
            } else {
                style.overflowX = 'hidden';
            }

            // Remove div constraints from text widgets
            if (this.widget instanceof LinkWidget) {
                style.overflowX = 'visible';
                style.overflowY = 'visible';
            }

            if (this.highlightWidgetsOnHover && this.hovering) {
                style.outline = '1px solid red';
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
