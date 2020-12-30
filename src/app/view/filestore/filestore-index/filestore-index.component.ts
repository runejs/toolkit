import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilestoreService } from '../../../filestore/filestore.service';
import { Subscription } from 'rxjs';
import { FileIndex } from '@runejs/filestore';

const fileNames = require('../../../../../filestore/file-names.json');
const mapFileNames = require('../../../../../filestore/map-file-names.json');


@Component({
    selector: 'rs-filestore-index',
    templateUrl: './filestore-index.component.html',
    styleUrls: [ './filestore-index.component.scss' ]
})
export class FilestoreIndexComponent implements OnInit, OnDestroy {

    public fileIndex: FileIndex;
    private routeSubscription: Subscription;

    public constructor(private route: ActivatedRoute,
                       private filestoreService: FilestoreService) {
    }

    public ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe(params =>
            this.loadIndex(params?.indexId || -1));
    }

    private loadIndex(indexId: number): void {
        if(indexId < 0 || indexId > 12) {
            return;
        }

        this.fileIndex = this.filestoreService.getIndex(indexId);
    }

    public ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    // @TODO convert into an angular pipe
    public fileName(nameHash?: number): string | null {
        if(!nameHash) {
            return '';
        }

        const fileName = fileNames[`${nameHash}`] || mapFileNames[`${nameHash}`] || null;
        return fileName || '';
    }

    public get files() {
        return this.fileIndex?.files?.values() || null;
    }

}
