import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ContainerWidget, LinkWidget, ParentWidget, WidgetBase } from '@runejs/filestore';
import { FilestoreService } from '../../filestore/filestore.service';


@Component({
    selector: 'rs-widget',
    templateUrl: './widget.component.html',
    styleUrls: [ './widget.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetComponent implements OnInit, AfterViewInit {
    // TODO fix widget 200 showing error
    @Input() public parentWidget: ParentWidget;
    @Input() public widget: WidgetBase;
    @Input() public hovering = false;

    public constructor(private filestoreService: FilestoreService) { }

    public ngOnInit(): void {
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

    public ngAfterViewInit(): void { }

    public getBase64Text(fontId: number, text: string, color?: number, hoverColor?: number) {
        if (this.hovering && hoverColor) {
            return this.filestoreService.filestore.fontStore.getFontById(fontId).drawString(text, hoverColor)
        }

        return this.filestoreService.filestore.fontStore.getFontById(fontId).drawString(text, color);
    }

    public get styles() {
        if (this.widget instanceof ParentWidget) {
            // Container styles
            // TODO calculate parent widget width from the children widths and their X positioning
            // TODO calculate parent widget height from the children widths and their Y positioning
            return {
                width: '600px',
                height: '1024px'
            }
        } else {
            // Everything else
            const style: any = {
                top: this.widget.y + 'px',
                left: this.widget.x + 'px',
                width: this.widget.width + 'px',
                height: this.widget.height + 'px'
            }

            // if (this.widget instanceof SpriteWidget) {
            //     style.display = 'flex';
            //     style['align-items'] = 'center';
            //     style['justify-content'] = 'center';
            // }

            // Remove constraints from text widgets
            // TODO center text when the alignment is 1
            if (this.widget instanceof LinkWidget) {
                style.height = undefined;
                style.width = undefined;
            }

            if (this.widget['scrollHeight'] && this.widget['scrollHeight'] > this.widget.height) {
                style.overflowY = 'auto';
            }

            return style;
        }
    }

}
