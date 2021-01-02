import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Archive, FileData, FileIndex, indexIdMap } from '@runejs/filestore';
import { FileNamePipe } from '../file-name/file-name.pipe';


@Component({
    selector: 'rs-file-preview',
    templateUrl: './file-preview.component.html',
    styleUrls: [ './file-preview.component.scss' ]
})
export class FilePreviewComponent implements OnInit, OnChanges {

    @Input() public file: Archive | FileData;
    @Input() public index: FileIndex;
    public fileName: string = '';

    public constructor(private fileNamePipe: FileNamePipe) {
    }

    public ngOnInit(): void {
        this.fileName = this.fileNamePipe.transform(this.file, this.index);
        if(!this.file.content) {
            this.file.decompress();
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if(changes.file && !changes.file.firstChange) {
            this.fileName = this.fileNamePipe.transform(this.file, this.index);
            if(!this.file.content) {
                this.file.decompress();
            }
        }
    }

    public get isMidi(): boolean {
        return this.index.indexId === indexIdMap.music;
    }

}
