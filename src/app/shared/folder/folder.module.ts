import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderComponent } from './folder.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FilePreviewModule } from '../file-preview/file-preview.module';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [ FolderComponent ],
    exports: [ FolderComponent ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        MatSidenavModule,
        FilePreviewModule,
        MatIconModule,
        RouterModule
    ]
})
export class FolderModule {
}
