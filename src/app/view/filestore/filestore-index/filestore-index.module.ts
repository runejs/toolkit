import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilestoreIndexComponent } from './filestore-index.component';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FileNameModule } from '../../../shared/file-name/file-name.module';
import { IndexNameModule } from '../../../shared/index-name/index-name.module';
import { BreadcrumbModule } from '../../../shared/breadcrumb/breadcrumb.module';


@NgModule({
    declarations: [ FilestoreIndexComponent ],
    imports: [
        CommonModule,
        RouterModule,
        MatDividerModule,
        MatIconModule,
        FileNameModule,
        IndexNameModule,
        BreadcrumbModule
    ]
})
export class FilestoreIndexModule {
}
