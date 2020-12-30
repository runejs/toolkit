import { Component, Input, OnInit } from '@angular/core';
import { Archive, FileData } from '@runejs/filestore';


export interface FilestoreIndex {
    index: string;
    indexId: number;
    indexName: string;
    files: Archive[] | FileData[];
}

@Component({
    selector: 'rs-index-detail',
    templateUrl: './index-detail.component.html',
    styleUrls: ['./index-detail.component.scss']
})
export class IndexDetailComponent implements OnInit {

    @Input() public index: FilestoreIndex;

    constructor() {
    }

    ngOnInit(): void {
    }

}
