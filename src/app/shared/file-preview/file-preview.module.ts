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
import { SpriteFilePreviewComponent } from './sprite-file-preview/sprite-file-preview.component';
import { SpriteComponent } from './sprite-file-preview/sprite/sprite.component';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
    declarations: [
        FilePreviewComponent,
        MidiFilePreviewComponent,
        ImageFilePreviewComponent,
        SoundFilePreviewComponent,
        SpriteFilePreviewComponent,
        SpriteComponent
    ],
    exports: [
        FilePreviewComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        IndexNameModule,
        MatDividerModule,
        MatTooltipModule,
        MatSliderModule
    ],
    providers: [
        FileNamePipe
    ]
})
export class FilePreviewModule {
}
