import { Component, OnInit } from '@angular/core';
import { FilestoreService } from '../../filestore/filestore.service';
import { FileTree } from './file-tree/file-tree.component';
import { indexIdMap } from '@runejs/filestore';

@Component({
    selector: 'rs-file-viewer',
    templateUrl: './file-viewer.component.html',
    styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {

    public fileTrees: FileTree[] = [];

    public constructor(private filestoreService: FilestoreService) {
    }

    public ngOnInit(): void {
        const filestore = this.filestoreService.newfilestore;

        console.log(indexIdMap);

        for(let i = 0; i <= 12; i++) {
            const index = filestore.getIndex(i);

            let indexName = '?';
            Object.keys(indexIdMap).forEach(name => {
                if(indexIdMap[name] === i) {
                    indexName = name;
                }
            });

            this.fileTrees.push({
                index: `File Index ${i}`,
                folderName: indexName,
                files: [ ...index.files.values() ]
            });
        }
    }

}
