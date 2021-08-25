import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ByteBuffer } from '@runejs/core/buffer';

@Component({
    selector: 'rs-image-file-preview',
    templateUrl: './image-file-preview.component.html',
    styleUrls: [ './image-file-preview.component.scss' ]
})
export class ImageFilePreviewComponent implements OnInit, OnChanges {

    @Input() public imageData: ByteBuffer;
    @Input() public extension: string;

    public base64: string = '';

    public constructor() {
    }

    public ngOnInit(): void {
        this.setup();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.setup();
    }

    public setup(): void {
        if(!this.imageData || !this.extension) {
            return;
        }

        const buffer = Buffer.from(this.imageData);
        this.base64 = `data:image/${this.extension};base64,${buffer.toString('base64')}`;
    }

}
