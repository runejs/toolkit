import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilestoreService } from '../../filestore/filestore.service';

@Component({
    selector: 'rs-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: [ './breadcrumb.component.scss' ]
})
export class BreadcrumbComponent implements OnInit {

    public searchInput: string = '';
    @Output() search = new EventEmitter<string>();

    public constructor(private filestoreService: FilestoreService) {
    }

    public ngOnInit(): void {
        this.setFileDisplay(this.filestoreService.fileDisplay);
    }

    public setFileDisplay(fileDisplay: 'grid' | 'list'): void {
        setTimeout(() => {
            this.filestoreService.fileDisplay = fileDisplay;
        }, 0);
    }

    public get fileDisplay() {
        return this.filestoreService.fileDisplay;
    }

}
