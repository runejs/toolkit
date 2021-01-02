import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePreviewComponent } from './file-preview.component';
import { FileNamePipe } from '../file-name/file-name.pipe';
import { MidiFilePreviewComponent } from './midi-file-preview/midi-file-preview.component';
import { MatIconModule } from '@angular/material/icon';
import { IndexNameModule } from '../index-name/index-name.module';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
    declarations: [ FilePreviewComponent, MidiFilePreviewComponent ],
    exports: [
        FilePreviewComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        IndexNameModule,
        MatDividerModule
    ],
    providers: [
        FileNamePipe
    ]
})
export class FilePreviewModule {
}
