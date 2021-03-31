import { Component, Input, OnInit } from '@angular/core';
import { ContainerWidget, SpritePack } from '@runejs/filestore';
import { FilestoreService } from '../../../filestore/filestore.service';

@Component({
    selector: 'rs-container-widget',
    templateUrl: './container-widget.component.html',
    styleUrls: ['./container-widget.component.scss']
})
export class ContainerWidgetComponent implements OnInit {
    @Input() container: ContainerWidget;
    scrollableY = false;
    scrollableX = false;
    scrollbarSprites: SpritePack;

    constructor(private filestoreService: FilestoreService) { }

    async ngOnInit() {
        this.scrollableY = this.container.scrollHeight > this.container.height;
        this.scrollableX = this.container.scrollWidth > this.container.width;
        await this.setScrollbarSprites();
    }

    async setScrollbarSprites() {
        this.scrollbarSprites = this.filestoreService.filestore.spriteStore.getSpritePack('scrollbar');
        this.scrollbarSprites.decode();
    }
}
