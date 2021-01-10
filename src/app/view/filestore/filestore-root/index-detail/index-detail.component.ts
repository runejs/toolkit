import { Component, Input, OnInit } from '@angular/core';
import { Archive, FileData, FileIndex, indexIdMap } from '@runejs/filestore';


export interface FilestoreIndex {
    index: FileIndex;
    files: Archive[] | FileData[];
}

@Component({
    selector: 'rs-index-detail',
    templateUrl: './index-detail.component.html',
    styleUrls: ['./index-detail.component.scss']
})
export class IndexDetailComponent implements OnInit {

    @Input() public indexInfo: FilestoreIndex;

    public constructor() {
    }

    public ngOnInit(): void {
    }

    public get routePath() {
        return [ '/', 'filestore', 'index', this.indexInfo.index.indexId ];
    }

}
