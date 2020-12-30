import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilestoreRootComponent } from './filestore-root.component';
import { IndexDetailComponent } from './index-detail/index-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IndexNameModule } from '../../../shared/index-name/index-name.module';
import { MatDividerModule } from '@angular/material/divider';
import { BreadcrumbModule } from '../../../shared/breadcrumb/breadcrumb.module';


@NgModule({
    declarations: [ FilestoreRootComponent, IndexDetailComponent ],
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule,
        IndexNameModule,
        MatDividerModule,
        BreadcrumbModule
    ]
})
export class FilestoreRootModule {
}
