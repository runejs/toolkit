import { Component, Input, OnInit } from '@angular/core';
import { WidgetChild, WidgetDefinition } from '@runejs/cache-parser';
import { Sprite, SpritesService } from '../../../sprites/sprites.service';
import { WidgetListService } from '../../widget-list.service';

@Component({
    selector: 'rs-widget-image',
    templateUrl: './widget-image.component.html',
    styleUrls: ['./widget-image.component.scss']
})
export class WidgetImageComponent implements OnInit {

    @Input() public widget: WidgetDefinition;
    @Input() public widgetChild: WidgetChild;
    public sprite: Sprite = null;

    public constructor(private spritesService: SpritesService,
                       private widgetListService: WidgetListService) {
    }

    public ngOnInit(): void {
        this.spritesService.fetchSprite(this.widgetChild.spriteId)
            .then(sprite => this.sprite = sprite);
    }

    public get x() {
        if(!this.widgetChild) {
            return 0;
        }

        if(this.widgetChild.parentId === -1) {
            return this.widgetChild.x;
        }

        return this.widgetChild.x + this.widget.children[this.widgetChild.parentId].x;
    }

    public get y() {
        if(!this.widgetChild) {
            return 0;
        }

        if(this.widgetChild.parentId === -1) {
            return this.widgetChild.y;
        }

        return this.widgetChild.y + this.widget.children[this.widgetChild.parentId].y;
    }

    public get styles() {
        return {
            top: (this.y + ((this.widgetChild.originalHeight / 2) - (this.sprite.height / 2)) + 'px'),
            left: (this.x + ((this.widgetChild.originalWidth / 2) - (this.sprite.width / 2)) + 'px')
        };
    }

}
