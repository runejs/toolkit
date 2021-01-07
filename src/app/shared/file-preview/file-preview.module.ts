import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePreviewComponent } from './file-preview.component';
import { FileNamePipe } from '../file-name/file-name.pipe';
import { MidiFilePreviewComponent } from './midi-file-preview/midi-file-preview.component';
import { MatIconModule } from '@angular/material/icon';
import { IndexNameModule } from '../index-name/index-name.module';
import { MatDividerModule } from '@angular/material/divider';
import { ImageFilePreviewComponent } from './image-file-preview/image-file-preview.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SoundFilePreviewComponent } from './sound-file-preview/sound-file-preview.component';


@NgModule({
    declarations: [ FilePreviewComponent, MidiFilePreviewComponent, ImageFilePreviewComponent, SoundFilePreviewComponent ],
    exports: [
        FilePreviewComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        IndexNameModule,
        MatDividerModule,
        MatTooltipModule
    ],
    providers: [
        FileNamePipe
    ]
})
export class FilePreviewModule {
}
