import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { Sprite } from '@runejs/filestore';
import { FilestoreService } from '../../../../filestore/filestore.service';

@Component({
    selector: 'rs-sprite',
    templateUrl: './sprite.component.html',
    styleUrls: [ './sprite.component.scss' ]
})
export class SpriteComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild('canvas') public canvasRef: ElementRef;

    @Input() public spritePackId: number;
    @Input() public spriteChildId = 0;
    @Input() public sprite: Sprite;
    @Input() public zoom: number = 100;

    public width: number = 0;
    public height: number = 0;

    public constructor(private filestoreService: FilestoreService) {
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        this.render();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const spriteChanges =
            (changes.sprite && !changes.sprite.firstChange)
            || (changes.spriteId && !changes.spriteId.firstChange)
            || (changes.spriteChildId && !changes.spriteChildId.firstChange)
        if (spriteChanges) {
            this.render();
        }
    }

    public render(): void {
        if(!this.sprite && !this.spritePackId) {
            return;
        }

        if(this.spritePackId && this.spritePackId !== -1) {
            this.sprite = this.filestoreService.filestore.spriteStore.getSpritePack(this.spritePackId).decode().sprites[this.spriteChildId];
        }

        if(!this.sprite) {
            return;
        }

        this.height = this.sprite.height;
        this.width = this.sprite.width;

        if(this.sprite.height < 1 || this.sprite.width < 1) {
            return;
        }

        const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        canvas.width = this.width;
        canvas.height = this.height;
        const context = canvas.getContext('2d');
        const pixels = this.sprite.getPixels();
        const imageData = new ImageData(pixels, this.sprite.width, this.sprite.height);
        context.putImageData(imageData, 0, 0);
    }

}
