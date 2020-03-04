import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { WidgetListRoutingModule } from './widget-list-routing.module';
import { WidgetListComponent } from './widget-list.component';
import { WidgetListService } from './widget-list.service';
import { MatCardModule } from '@angular/material/card';
import { WidgetModule } from './widget/widget.module';


@NgModule({
    declarations: [WidgetListComponent],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatCardModule,
        WidgetListRoutingModule,
        WidgetModule
    ],
    providers: [WidgetListService]
})
export class WidgetListModule {
}
