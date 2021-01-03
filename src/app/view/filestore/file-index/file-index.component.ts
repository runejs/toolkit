import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilestoreService } from '../../../filestore/filestore.service';
import { Subscription } from 'rxjs';
import { Archive, FileData, FileIndex } from '@runejs/filestore';
import { IndexNamePipe } from '../../../shared/index-name/index-name.pipe';


@Component({
    selector: 'rs-file-index',
    templateUrl: './file-index.component.html',
    styleUrls: [ './file-index.component.scss' ]
})
export class FileIndexComponent implements OnInit, OnDestroy {

    public fileIndex: FileIndex;
    public files: Archive[] | FileData[];
    private routeSubscription: Subscription;

    public constructor(private route: ActivatedRoute,
                       private filestoreService: FilestoreService,
                       private indexNamePipe: IndexNamePipe) {
    }

    public ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe(params =>
            this.loadIndex(params?.indexId || -1));
    }

    private loadIndex(indexId: number): void {
        if(indexId < 0 || indexId > 12) {
            return;
        }

        setTimeout(() => {
            this.fileIndex = this.filestoreService.getIndex(indexId);
            this.files = Array.from(this.fileIndex.files.values());

            this.filestoreService.breadcrumb = [
                this.indexNamePipe.transform(this.fileIndex) + ` <span>[index ${this.fileIndex.indexId}]</span>`
            ];
        }, 0);
    }

    public ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}
