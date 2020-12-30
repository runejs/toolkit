import { Component, Input, OnInit } from '@angular/core';
import { Archive, FileData } from '@runejs/filestore';

const fileNames = require('../../../../../filestore/file-names.json');
const mapFileNames = require('../../../../../filestore/map-file-names.json');

export interface FileTree {
    index: string;
    folderName: string;
    files: Archive[] | FileData[];
}

@Component({
    selector: 'rs-file-tree',
    templateUrl: './file-tree.component.html',
    styleUrls: ['./file-tree.component.scss']
})
export class FileTreeComponent implements OnInit {

    @Input() public fileTree: FileTree;

    public expanded = false;

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
