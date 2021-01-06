import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileData, FileIndex } from '@runejs/filestore';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { FilestoreService } from '../../filestore/filestore.service';

@Component({
    selector: 'rs-folder',
    templateUrl: './folder.component.html',
    styleUrls: [ './folder.component.scss' ]
})
export class FolderComponent implements OnInit, OnDestroy {

    public filePreview: {
        file: FileData;
        index: FileIndex;
    } | null = null;

    private sub: Subscription;

    public constructor(private router: Router,
                       private filestoreService: FilestoreService) {
    }

    public ngOnInit(): void {
        this.sub = this.filestoreService.previewFileEvent.subscribe(event =>
            this.filePreview = event);
        this.sub.add(this.router.events.subscribe(routerEvent => {
            if(routerEvent instanceof NavigationStart) {
                setTimeout(() => this.filePreview = null, 0);
            }
        }));
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public get breadcrumb() {
        return this.filestoreService.breadcrumb;
    }

    public get fileDisplay() {
        return this.filestoreService.fileDisplay;
    }

}
