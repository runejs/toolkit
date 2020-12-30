import { Component, Input, OnInit } from '@angular/core';
import { Archive, FileData } from '@runejs/filestore';

const fileNames = require('../../../../../../filestore/file-names.json');
const mapFileNames = require('../../../../../../filestore/map-file-names.json');


export interface FilestoreIndex {
    index: string;
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

    // @TODO convert into an angular pipe
    public fileName(id: number, nameHash?: number): string | null {
        if(!nameHash) {
            return `${id}`;
        }

        const fileName = fileNames[`${nameHash}`] || mapFileNames[`${nameHash}`] || null;
        return `${id}` + (fileName ? `: ${fileName}` : '');
    }

}
