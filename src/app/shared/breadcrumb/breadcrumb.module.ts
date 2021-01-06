import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [ BreadcrumbComponent ],
    exports: [ BreadcrumbComponent ],
    imports: [
        CommonModule,
        MatIconModule,
        MatDividerModule,
        MatTooltipModule
    ]
})
export class BreadcrumbModule {
}
