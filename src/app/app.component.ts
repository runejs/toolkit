import { Component, OnInit } from '@angular/core';
import { FilestoreService } from './filestore/filestore.service';
import { Router } from '@angular/router';

@Component({
    selector: 'rs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

    public loading = true;

    public constructor(private router: Router,
                       private filestoreService: FilestoreService) {
    }

    public async ngOnInit(): Promise<void> {
        this.loading = true;
        this.filestoreService.loadFilestore('./filestore');
        await this.router.navigate(['filestore']);
        this.loading = false;
    }

}
