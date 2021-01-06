import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FilestoreService } from '../../filestore/filestore.service';

@Component({
    selector: 'rs-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: [ './breadcrumb.component.scss' ]
})
export class BreadcrumbComponent implements OnInit {

    @Input() public fileDisplay: 'grid' | 'list';
    @Output() public fileDisplayChange = new EventEmitter<'grid' | 'list'>();

    public constructor(private filestoreService: FilestoreService) {
    }

    public ngOnInit(): void {
        this.setFileDisplay(this.filestoreService.fileDisplay);
    }

    public setFileDisplay(fileDisplay: 'grid' | 'list'): void {
        setTimeout(() => {
            this.fileDisplay = fileDisplay;
            this.filestoreService.fileDisplay = fileDisplay;
            this.fileDisplayChange.emit(fileDisplay);
        }, 0);
    }

}
