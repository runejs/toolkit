import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilestoreIndexComponent } from './filestore-index.component';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FileNameModule } from '../../../shared/file-name/file-name.module';
import { IndexNameModule } from '../../../shared/index-name/index-name.module';
import { FileModule } from '../../../shared/file/file.module';
import { IndexNamePipe } from '../../../shared/index-name/index-name.pipe';


@NgModule({
    declarations: [ FilestoreIndexComponent ],
    imports: [
        CommonModule,
        RouterModule,
        MatDividerModule,
        MatIconModule,
        FileNameModule,
        IndexNameModule,
        FileModule
    ],
    providers: [
        IndexNamePipe
    ]
})
export class FilestoreIndexModule {
}
