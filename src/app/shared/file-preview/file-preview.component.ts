import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Archive, FileData, FileIndex, indexIdMap, SpritePack } from '@runejs/filestore';
import { FileNamePipe } from '../file-name/file-name.pipe';
import { FilestoreService } from '../../filestore/filestore.service';


@Component({
    selector: 'rs-file-preview',
    templateUrl: './file-preview.component.html',
    styleUrls: [ './file-preview.component.scss' ]
})
export class FilePreviewComponent implements OnInit, OnChanges {

    @Input() public file: Archive | FileData;
    @Input() public index: FileIndex;
    public fileName: string = '';

    public constructor(private fileNamePipe: FileNamePipe,
                       private filestoreService: FilestoreService) {
    }

    public ngOnInit(): void {
        this.setFileName();
        this.file.decompress();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if(changes.file && !changes.file.firstChange) {
            this.setFileName();
            this.file.decompress();
        }
    }

    public setFileName(): void {
        if(this.index.indexId === indexIdMap.widgets) {
            this.fileName = `Widget Archive ${this.file.fileId}`;
        } else {
            this.fileName = this.fileNamePipe.transform(this.file, this.index);
        }
    }

    public close(): void {
        this.filestoreService.previewFileEvent.next(null);
    }

    public get spritePack(): SpritePack | null {
        if(!this.isSprite) {
            return null;
        }

        return new SpritePack(this.file);
    }

    public get isMidi(): boolean {
        return this.index.indexId === indexIdMap.music;
    }

    public get isSound(): boolean {
        return this.index.indexId === indexIdMap.sounds;
    }

    public get isJingle(): boolean {
        return this.index.indexId === indexIdMap.jingles;
    }

    public get isSprite(): boolean {
        return this.index.indexId === indexIdMap.sprites;
    }

    public get isModel(): boolean {
        return this.index.indexId === indexIdMap.models;
    }

    public get isWidget(): boolean {
        return this.index.indexId === indexIdMap.widgets;
    }

    public get isImage(): boolean {
        return this.fileName.endsWith('.jpg') || this.fileName.endsWith('.jpeg');
    }

}
