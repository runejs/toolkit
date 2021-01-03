import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilestoreRoutingModule } from './filestore-routing.module';
import { FilestoreComponent } from './filestore.component';
import { FilestoreRootModule } from './filestore-root/filestore-root.module';
import { FileIndexModule } from './file-index/file-index.module';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FilePreviewModule } from '../../shared/file-preview/file-preview.module';
import { ArchiveModule } from './archive/archive.module';


@NgModule({
    declarations: [ FilestoreComponent ],
    imports: [
        CommonModule,
        FilestoreRoutingModule,
        FilestoreRootModule,
        FileIndexModule,
        ArchiveModule,
        BreadcrumbModule,
        MatIconModule,
        MatSidenavModule,
        FilePreviewModule
    ]
})
export class FilestoreModule {
}
