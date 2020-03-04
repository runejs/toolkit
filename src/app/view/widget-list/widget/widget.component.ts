import { Component, Input, OnInit } from '@angular/core';
import { WidgetDefinition } from '@runejs/cache-parser';

@Component({
    selector: 'rs-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

    @Input() public widget: WidgetDefinition;

    public constructor() {
    }

    public ngOnInit(): void {
        console.log(JSON.stringify(this.widget, null, 4));
    }

}
