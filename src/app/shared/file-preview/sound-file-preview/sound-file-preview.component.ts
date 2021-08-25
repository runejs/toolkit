import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ByteBuffer } from '@runejs/core/buffer';

@Component({
    selector: 'rs-sound-file-preview',
    templateUrl: './sound-file-preview.component.html',
    styleUrls: [ './sound-file-preview.component.scss' ]
})
export class SoundFilePreviewComponent implements OnInit, OnChanges, AfterViewInit {

    @ViewChild('audioElement') audioPlayer: HTMLAudioElement;

    @Input() public extension: 'ogg' | 'wav' = 'ogg';
    @Input() public fileData: ByteBuffer;

    public base64: string = '';

    public constructor() {
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        this.setup();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.setup();
    }

    private setup(): void {
        if(!this.fileData || this.fileData.length === 0) {
            return;
        }

        const buffer = Buffer.from(this.fileData);
        this.base64 = `data:audio/${this.extension};base64,${buffer.toString('base64')}`;

        if(this.audioPlayer) {
             const audioPlayer = new Audio(this.base64);
            // this.audioPlayer.src = this.base64;
            audioPlayer.play();
        }
    }

}
