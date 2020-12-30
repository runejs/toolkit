import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileViewerRoutingModule } from './file-viewer-routing.module';
import { FileViewerComponent } from './file-viewer.component';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [FileViewerComponent, FileTreeComponent],
    imports: [
        CommonModule,
        FileViewerRoutingModule,
        MatIconModule,
        MatTooltipModule
    ]
})
export class FileViewerModule {
}
