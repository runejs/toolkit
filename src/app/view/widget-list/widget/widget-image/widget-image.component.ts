import { Component, Input, OnInit } from '@angular/core';
import { WidgetChild, WidgetDefinition } from '@runejs/cache-parser';
import { Sprite, SpritesService } from '../../../sprites/sprites.service';
import { WidgetContainerChild, WidgetListService } from '../../widget-list.service';

@Component({
    selector: 'rs-widget-image',
    templateUrl: './widget-image.component.html',
    styleUrls: ['./widget-image.component.scss']
})
export class WidgetImageComponent implements OnInit {

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
        return this.widgetChild?.x || 0;
    }

    public get y() {
        return this.widgetChild?.y || 0;
    }

    public get styles() {
        const height = this.sprite.height > this.widgetChild.originalHeight ? this.widgetChild.originalHeight : this.sprite.height;
        const width = this.sprite.width > this.widgetChild.originalWidth ? this.widgetChild.originalWidth : this.sprite.width;

        return {
            top: (this.y + ((this.widgetChild.originalHeight / 2) - (height / 2)) + 'px'),
            left: (this.x + ((this.widgetChild.originalWidth / 2) - (width / 2)) + 'px'),
            maxWidth: width + 'px',
            maxHeight: height + 'px'
        };
    }

}
