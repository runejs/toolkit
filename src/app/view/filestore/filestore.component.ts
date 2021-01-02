import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilestoreService } from '../../filestore/filestore.service';
import { FileData, FileIndex } from '@runejs/filestore';
import { Subscription } from 'rxjs';


@Component({
    selector: 'rs-filestore',
    templateUrl: './filestore.component.html',
    styleUrls: ['./filestore.component.scss']
})
export class FilestoreComponent implements OnInit, OnDestroy {

    public filePreview: {
        file: FileData;
        index: FileIndex;
    } | null = null;

    private sub: Subscription;

    public constructor(private filestoreService: FilestoreService) {
        this.sub = this.filestoreService.previewFileEvent.subscribe(event =>
            this.filePreview = event);
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public get breadcrumb() {
        return this.filestoreService.breadcrumb;
    }

}
