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
    public paused: boolean = false;

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
        this.paused = false;
        MIDIjs.stop();
    }

    public pause(): void {
        this.paused = true;
        MIDIjs.pause();
    }

    public resume(): void {
        this.paused = false;
        MIDIjs.resume();
    }

    public playMidi(): void {
        if(this.playing) {
            if(this.paused) {
                this.resume();
            } else {
                this.pause();
            }
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

    public get buttonIcon(): string {
        if(!this.playing) {
            return 'play_circle';
        }

        return !this.paused ? 'pause_circle_outline' : 'play_circle_outline';
    }

}
