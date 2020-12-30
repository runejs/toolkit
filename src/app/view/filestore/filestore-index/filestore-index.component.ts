import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilestoreService } from '../../../filestore/filestore.service';
import { Subscription } from 'rxjs';
import { FileIndex } from '@runejs/filestore';

@Component({
    selector: 'rs-filestore-index',
    templateUrl: './filestore-index.component.html',
    styleUrls: [ './filestore-index.component.scss' ]
})
export class FilestoreIndexComponent implements OnInit, OnDestroy {

    public index: FileIndex;
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

        this.index = this.filestoreService.getIndex(indexId);
    }

    public ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}
