import { Component, Input, OnInit } from '@angular/core';
import { Archive, FileData, FileIndex, indexIdMap } from '@runejs/filestore';
import { FileNamePipe } from '../file-name/file-name.pipe';
import { FilestoreService } from '../../filestore/filestore.service';


@Component({
    selector: 'rs-file',
    templateUrl: './file.component.html',
    styleUrls: [ './file.component.scss' ]
})
export class FileComponent implements OnInit {

    @Input() public file: Archive | FileData;
    @Input() public index: FileIndex;
    private name: string = '';

    public constructor(private fileName: FileNamePipe,
                       private filestoreService: FilestoreService) {
    }

    public ngOnInit(): void {
        this.name = this.fileName.transform(this.file, this.index);
    }

    public openPreview(): void {
        const { file, index } = this;
        this.filestoreService.previewFileEvent.next({ file, index });
    }

    public get fileIcon(): string {
        if(this.file.type === 'archive') {
            return 'folder';
        }

        if(this.index.indexId === indexIdMap.music) {
            return 'video_library';
        } else {
            if(this.name.endsWith('.jpg') || this.name.endsWith('.jpeg') || this.name.endsWith('.png')) {
                return 'image';
            }
        }

        return 'insert_drive_file';
    }

}
