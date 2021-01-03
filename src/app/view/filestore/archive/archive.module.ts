import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveComponent } from './archive.component';
import { IndexNamePipe } from '../../../shared/index-name/index-name.pipe';
import { FileModule } from '../../../shared/file/file.module';


@NgModule({
    declarations: [ ArchiveComponent ],
    imports: [
        CommonModule,
        FileModule
    ],
    providers: [
        IndexNamePipe
    ]
})
export class ArchiveModule {
}
