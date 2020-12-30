import { Component, OnInit } from '@angular/core';
import { FilestoreService } from '../../filestore/filestore.service';
import { FilestoreIndex } from './filestore-index/filestore-index.component';
import { indexIdMap } from '@runejs/filestore';

@Component({
    selector: 'rs-filestore',
    templateUrl: './filestore.component.html',
    styleUrls: ['./filestore.component.scss']
})
export class FilestoreComponent implements OnInit {

    public indexes: FilestoreIndex[] = [];

    public constructor(private filestoreService: FilestoreService) {
    }

    public ngOnInit(): void {
        const filestore = this.filestoreService.filestore;

        for(let i = 0; i <= 12; i++) {
            const index = filestore.getIndex(i);

            let indexName = '?';
            Object.keys(indexIdMap).forEach(name => {
                if(indexIdMap[name] === i) {
                    indexName = name;
                }
            });

            this.indexes.push({
                index: `File Index ${i}`,
                indexName,
                files: [ ...index.files.values() ]
            });
        }
    }

}
