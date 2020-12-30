import { Component, Input, OnInit } from '@angular/core';
import { Archive, FileData, FileIndex } from '@runejs/filestore';


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

    constructor() {
    }

    ngOnInit(): void {
    }

}
