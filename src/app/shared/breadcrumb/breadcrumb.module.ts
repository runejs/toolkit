import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [ BreadcrumbComponent ],
    exports: [ BreadcrumbComponent ],
    imports: [
        CommonModule,
        MatIconModule,
        MatDividerModule,
        MatTooltipModule,
        FormsModule
    ]
})
export class BreadcrumbModule {
}
