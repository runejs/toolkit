import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileNamePipe } from './file-name.pipe';


@NgModule({
    declarations: [ FileNamePipe ],
    exports: [
        FileNamePipe
    ],
    imports: [
        CommonModule
    ]
})
export class FileNameModule {
}
