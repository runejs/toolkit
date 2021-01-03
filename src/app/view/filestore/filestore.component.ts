import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilestoreService } from '../../filestore/filestore.service';
import { FileData, FileIndex } from '@runejs/filestore';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';


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

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public get breadcrumb() {
        return this.filestoreService.breadcrumb;
    }

}
