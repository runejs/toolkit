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
        const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        const pixels = this.sprite.getPixels();
        const imageData = new ImageData(pixels, this.sprite.width, this.sprite.height);
        context.putImageData(imageData, 0, 0);
    }

}
