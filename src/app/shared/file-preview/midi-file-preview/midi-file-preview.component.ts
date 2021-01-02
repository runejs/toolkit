import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FileData } from '@runejs/filestore';


@Component({
    selector: 'rs-midi-file-preview',
    templateUrl: './midi-file-preview.component.html',
    styleUrls: [ './midi-file-preview.component.scss' ]
})
export class MidiFilePreviewComponent implements OnInit, OnChanges, OnDestroy {

    @Input() public midiFile: FileData;
    public playing: boolean = false;

    public constructor() {
    }

    public ngOnInit(): void {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if(changes.midiFile && !changes.midiFile.firstChange) {
            this.stopPlaying();
        }
    }

    public ngOnDestroy(): void {
        this.stopPlaying();
    }

    public stopPlaying(): void {
        this.playing = false;
        MIDIjs.stop();
    }

    public playMidi(): void {
        if(this.playing) {
            this.stopPlaying();
        } else {
            if(!this.midiFile.content || this.midiFile.content.length === 0) {
                this.midiFile.decompress();
            }

            const midiBuffer = `'data:audio/midi;base64,${Buffer.from(this.midiFile.content).toString('base64')}`;

            try {
                this.playing = true;
                MIDIjs.play(midiBuffer);
            } catch(err) {
                this.playing = false;
                console.error(`Cannot play MIDI ${this.midiFile.fileId}`, err);
            }
        }
    }

}
