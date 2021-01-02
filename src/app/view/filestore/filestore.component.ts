import { Component, OnInit } from '@angular/core';
import { FilestoreService } from '../../filestore/filestore.service';


@Component({
    selector: 'rs-filestore',
    templateUrl: './filestore.component.html',
    styleUrls: ['./filestore.component.scss']
})
export class FilestoreComponent implements OnInit {

    public constructor(private filestoreService: FilestoreService) {
    }

    public ngOnInit(): void {
    }

    public get breadcrumb() {
        return this.filestoreService.breadcrumb;
    }

}
