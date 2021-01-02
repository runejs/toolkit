import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from './file.component';
import { MatIconModule } from '@angular/material/icon';
import { FileNameModule } from '../file-name/file-name.module';
import { FileNamePipe } from '../file-name/file-name.pipe';


@NgModule({
    declarations: [ FileComponent ],
    exports: [
        FileComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        FileNameModule
    ],
    providers: [
        FileNamePipe
    ]
})
export class FileModule {
}
