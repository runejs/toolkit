import { Component, OnInit } from '@angular/core';
import { FilestoreIndex } from './index-detail/index-detail.component';
import { FilestoreService } from '../../../filestore/filestore.service';
import { indexIdMap } from '@runejs/filestore';


@Component({
    selector: 'rs-filestore-root',
    templateUrl: './filestore-root.component.html',
    styleUrls: ['./filestore-root.component.scss']
})
export class FilestoreRootComponent implements OnInit {

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
