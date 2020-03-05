import { Component, Input, OnInit } from '@angular/core';
import { WidgetChild, WidgetDefinition } from '@runejs/cache-parser';
import { WidgetContainerChild } from '../widget-list.service';

@Component({
    selector: 'rs-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

    @Input() public widget: WidgetDefinition;
    @Input() public containerChild: WidgetChild = null;
    public children: WidgetContainerChild[];

    public constructor() {
    }

    public ngOnInit(): void {
        console.log(JSON.stringify(this.widget, null, 4));

        if(!this.widget.children) {
            this.children = [];
            return;
        }

        const children: WidgetContainerChild[] = JSON.parse(JSON.stringify(this.widget.children));

        children.forEach(child => {
            if(child.parentId !== -1 && (this.containerChild === null || child.parentId !== this.widget.id)) {
                const parent = children.find(widgetChild => widgetChild.id === child.parentId);
                if(!parent) {
                    console.error('Invalid widget parent id.');
                    return;
                }

                if(!parent.children) {
                    parent.children = [];
                }

                const newChild: WidgetContainerChild = JSON.parse(JSON.stringify(child));
                child.erase = true;

                parent.children.push(newChild);
            }

            if(child.isHidden) {
                child.erase = true;
            }
        });

        this.children = children.filter(child => !child.erase);
    }

    public createWidgetDefinition(widgetChild: WidgetContainerChild): WidgetDefinition {
        return {
            id: widgetChild.id,
            crc: 0, version: 0,
            children: widgetChild.children
        };
    }

    public get styles() {
        if(this.containerChild === null) {
            return {};
        }

        return {
            position: 'absolute',
            top: this.containerChild.y + 'px',
            left: this.containerChild.x + 'px',
            width: this.containerChild.originalWidth + 'px',
            height: this.containerChild.originalHeight + 'px',
            overflow: 'hidden'
        };
    }

}
