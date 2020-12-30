import { Component, Input, OnInit } from '@angular/core';
import { Archive, FileData } from '@runejs/filestore';

const fileNames = require('../../../../../filestore/file-names.json');
const mapFileNames = require('../../../../../filestore/map-file-names.json');


export interface FilestoreIndex {
    index: string;
    indexName: string;
    files: Archive[] | FileData[];
}

@Component({
    selector: 'rs-filestore-index',
    templateUrl: './filestore-index.component.html',
    styleUrls: ['./filestore-index.component.scss']
})
export class FilestoreIndexComponent implements OnInit {

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
