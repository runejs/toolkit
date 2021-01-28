import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ContainerWidget, ParentWidget, WidgetBase } from '@runejs/filestore';


@Component({
    selector: 'rs-widget',
    templateUrl: './widget.component.html',
    styleUrls: [ './widget.component.scss' ]
})
export class WidgetComponent implements OnInit, AfterViewInit {

    @Input() public parentWidget: ParentWidget;
    @Input() public widget: WidgetBase;

    public constructor() {
    }

    public ngOnInit(): void {
        if(!(this.widget instanceof ContainerWidget) && !(this.widget instanceof ParentWidget)) {
            return;
        }

        this.widget.type = 0;

        const parentWidgetChildren: WidgetBase[] = this.parentWidget.children;

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
            }
        });
    }

    public ngAfterViewInit(): void {
    }

    public get styles() {
        if(!(this.widget instanceof ParentWidget) && !(this.widget instanceof ContainerWidget)) {
            return {
                top: this.widget.y + 'px',
                left: this.widget.x + 'px',
                width: this.widget.width + 'px',
                height: this.widget.height + 'px'
            };
        }

        return {};
    }

}
