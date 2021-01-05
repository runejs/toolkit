import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilestoreRootComponent } from './filestore-root.component';
import { IndexDetailComponent } from './index-detail/index-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IndexNameModule } from '../../../shared/index-name/index-name.module';
import { MatDividerModule } from '@angular/material/divider';
import { FolderModule } from '../../../shared/folder/folder.module';


@NgModule({
    declarations: [ FilestoreRootComponent, IndexDetailComponent ],
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule,
        IndexNameModule,
        MatDividerModule,
        FolderModule
    ]
})
export class FilestoreRootModule {
}
