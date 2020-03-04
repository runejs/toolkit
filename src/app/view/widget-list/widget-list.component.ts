import { Component, OnInit } from '@angular/core';
import { WidgetListService } from './widget-list.service';
import { WidgetDefinition } from '@runejs/cache-parser';

@Component({
    selector: 'rs-widgets',
    templateUrl: './widget-list.component.html',
    styleUrls: ['./widget-list.component.scss']
})
export class WidgetListComponent implements OnInit {

    public loading = true;
    public widgets: WidgetDefinition[] = [];
    public preview: WidgetDefinition = null;

    public constructor(private widgetsService: WidgetListService) {
    }

    public ngOnInit(): void {
        this.widgets = this.widgetsService.fetchWidgets();
        this.loading = false;
    }

    public setPreview(widget: WidgetDefinition): void {
        this.preview = widget;
    }

}
