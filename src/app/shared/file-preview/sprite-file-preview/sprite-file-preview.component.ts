import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SpritePack } from '@runejs/filestore';
import { FilestoreService } from '../../../filestore/filestore.service';

@Component({
    selector: 'rs-sprite-file-preview',
    templateUrl: './sprite-file-preview.component.html',
    styleUrls: [ './sprite-file-preview.component.scss' ]
})
export class SpriteFilePreviewComponent implements OnInit, OnChanges {

    @Input() public spritePackId: number;
    public spritePack: SpritePack;
    public decoded: boolean = false;
    public zoom: number = 100;

    public constructor(private fileService: FilestoreService) {
    }

    public ngOnInit(): void {
        this.decode();

        setTimeout(() => {
            this.decoded = true;
        }, 0);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if(changes?.spritePackId && !changes.spritePackId.firstChange) {
            this.decode();
        }
    }

    public decode(): void {
        try {
            this.spritePack = this.fileService.filestore.spriteStore.getSpritePack(this.spritePackId);
            this.spritePack?.decode();
        } catch(e) {
            console.error(e);
        }
    }

}
