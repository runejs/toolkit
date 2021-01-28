import { Component, Input, OnInit } from '@angular/core';
import { FilestoreService } from '../../../filestore/filestore.service';
import { ParentWidget } from '@runejs/filestore';

@Component({
    selector: 'rs-widget-file-preview',
    templateUrl: './widget-file-preview.component.html',
    styleUrls: [ './widget-file-preview.component.scss' ]
})
export class WidgetFilePreviewComponent implements OnInit {

    @Input() public widgetId: number;

    public widget: ParentWidget;

    public constructor(private filestoreService: FilestoreService) {
    }

    public ngOnInit(): void {
        this.widget = this.filestoreService.filestore.widgetStore.decodeWidget(this.widgetId) as ParentWidget;
    }

}
