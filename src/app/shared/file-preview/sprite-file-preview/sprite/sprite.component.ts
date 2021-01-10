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

@Component({
    selector: 'rs-sprite',
    templateUrl: './sprite.component.html',
    styleUrls: [ './sprite.component.scss' ]
})
export class SpriteComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild('canvas') public canvasRef: ElementRef;

    @Input() public sprite: Sprite;
    @Input() public zoom: number = 100;

    public width: number = 0;
    public height: number = 0;

    public constructor() {
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        this.render();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if(changes.sprite && !changes.sprite.firstChange) {
            this.render();
        }
    }

    public render(): void {
        if(!this.sprite) {
            return;
        }

        this.height = this.sprite.height;
        this.width = this.sprite.width;

        const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        canvas.width = this.width;
        canvas.height = this.height;
        const context = canvas.getContext('2d');
        const pixels = this.sprite.getPixels();
        const imageData = new ImageData(pixels, this.sprite.width, this.sprite.height);
        context.putImageData(imageData, 0, 0);
    }

}
