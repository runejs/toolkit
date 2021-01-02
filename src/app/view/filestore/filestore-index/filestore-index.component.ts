import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilestoreService } from '../../../filestore/filestore.service';
import { Subscription } from 'rxjs';
import { Archive, FileData, FileIndex } from '@runejs/filestore';


import * as MIDI from 'midicube';
import { IndexNamePipe } from '../../../shared/index-name/index-name.pipe';

let player;
MIDI.loadPlugin({
    soundfontUrl: './soundfont/sf2/',
    onprogress: (state, progress) => {
        MIDI.loader.setValue(progress * 100);
    },
    onsuccess: () => {
        player = MIDI.Player;
        player.timeWarp = 1;
    }
});

console.log(MIDI.loadPlugin);

@Component({
    selector: 'rs-filestore-index',
    templateUrl: './filestore-index.component.html',
    styleUrls: [ './filestore-index.component.scss' ]
})
export class FilestoreIndexComponent implements OnInit, OnDestroy {

    public fileIndex: FileIndex;
    public files: Archive[] | FileData[];
    private routeSubscription: Subscription;

    public constructor(private route: ActivatedRoute,
                       private filestoreService: FilestoreService,
                       private indexNamePipe: IndexNamePipe) {
    }

    public ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe(params =>
            this.loadIndex(params?.indexId || -1));
    }

    public clickTest(file: FileData | Archive): void {
        if(!file.content || file.content.length === 0) {
            file.decompress();
        }

        const midiBuffer = `'data:audio/midi;base64,${Buffer.from(file.content).toString('base64')}`;

        try {
            // MIDIjs.play(midiBuffer);
            player.loadFile(midiBuffer, player.start);
        } catch(err) {
            console.error(`Cannot play ${file.fileId}: `, err);
        }
    }

    private loadIndex(indexId: number): void {
        if(indexId < 0 || indexId > 12) {
            return;
        }

        setTimeout(() => {
            this.fileIndex = this.filestoreService.getIndex(indexId);
            this.files = Array.from(this.fileIndex.files.values());

            this.filestoreService.breadcrumb = [
                this.indexNamePipe.transform(this.fileIndex)
            ];
        }, 0);
    }

    public ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}
