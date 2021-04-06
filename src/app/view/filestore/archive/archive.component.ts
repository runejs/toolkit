import { Component, OnDestroy, OnInit } from '@angular/core';
import { Archive, FileData, FileIndex } from '@runejs/filestore';
import { FilestoreService } from '../../../filestore/filestore.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IndexNamePipe } from '../../../shared/index-name/index-name.pipe';

@Component({
    selector: 'rs-archive',
    templateUrl: './archive.component.html',
    styleUrls: [ './archive.component.scss' ]
})
export class ArchiveComponent implements OnInit, OnDestroy {

    public fileIndex: FileIndex;
    public archive: Archive;
    public files: FileData[] = [];

    private routeSubscription: Subscription;

    public constructor(private route: ActivatedRoute,
                       private filestoreService: FilestoreService,
                       private indexNamePipe: IndexNamePipe) {
    }

    public ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe(params =>
            this.loadArchive(params?.indexId || -1, params?.archiveId || -1));
    }

    public ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    public loadArchive(indexId: number, archiveId: number): void {
        if(indexId === undefined || archiveId === undefined || isNaN(indexId) || isNaN(archiveId) || indexId < 0 || archiveId < 0) {
            return;
        }

        setTimeout(() => {
            this.fileIndex = this.filestoreService.getIndex(indexId);
            this.archive = this.fileIndex.getArchive(parseInt(`${ archiveId }`, 10));

            this.archive.decodeArchiveFiles();
            this.files = Array.from(this.archive.files.values());

            this.filestoreService.fileDisplay = 'list';
            this.filestoreService.breadcrumb = [
                [
                    this.indexNamePipe.transform(this.fileIndex) + ` <span>[index ${ this.fileIndex.indexId }]</span>`,
                    `/filestore/index/${ this.fileIndex.indexId }`
                ],
                `Archive ${ this.archive.fileId }`
            ];
        }, 0);
    }

    public get fileDisplay() {
        return this.filestoreService.fileDisplay;
    }

}
