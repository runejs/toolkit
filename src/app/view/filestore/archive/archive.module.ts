import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveComponent } from './archive.component';
import { IndexNamePipe } from '../../../shared/index-name/index-name.pipe';
import { FileModule } from '../../../shared/file/file.module';
import { FolderModule } from '../../../shared/folder/folder.module';


@NgModule({
    declarations: [ ArchiveComponent ],
    imports: [
        CommonModule,
        FileModule,
        FolderModule
    ],
    providers: [
        IndexNamePipe
    ]
})
export class ArchiveModule {
}
