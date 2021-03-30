import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FilestoreService } from '../../../filestore/filestore.service';
import { ParentWidget } from '@runejs/filestore';

@Component({
    selector: 'rs-widget-file-preview',
    templateUrl: './widget-file-preview.component.html',
    styleUrls: [ './widget-file-preview.component.scss' ]
})
export class WidgetFilePreviewComponent implements OnInit, OnChanges {
    @Input() widgetId: number;
    widget: ParentWidget;
    decoded = false;
    showGrid = true;
    highlightWidgetsOnHover = false;

    constructor(private filestoreService: FilestoreService) { }

    ngOnInit(): void {
        this.decode();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.widgetId && !changes.widgetId.firstChange) {
            this.decoded = false;
            this.decode();
        }
    }

    decode() {
        try {
            this.widget = this.filestoreService.filestore.widgetStore.decodeWidget(this.widgetId) as ParentWidget;
            this.decoded = true;
        } catch (e) {
            console.error(e);
        }
    }
}
