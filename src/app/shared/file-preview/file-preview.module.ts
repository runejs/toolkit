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
import { MatSliderModule } from '@angular/material/slider';
import { ModelFilePreviewComponent } from './model-file-preview/model-file-preview.component';
import { WidgetModule } from '../widget/widget.module';
import { SpriteModule } from './sprite-file-preview/sprite/sprite.module';
import { WidgetFilePreviewComponent } from './widget-file-preview/widget-file-preview.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
    declarations: [
        FilePreviewComponent,
        MidiFilePreviewComponent,
        ImageFilePreviewComponent,
        SoundFilePreviewComponent,
        SpriteFilePreviewComponent,
        ModelFilePreviewComponent,
        WidgetFilePreviewComponent
    ],
    exports: [
        FilePreviewComponent
    ],
    imports: [
        CommonModule,
        NgxJsonViewerModule,
        MatIconModule,
        IndexNameModule,
        MatDividerModule,
        MatTooltipModule,
        MatSliderModule,
        WidgetModule,
        SpriteModule,
        MatCheckboxModule,
        MatCardModule,
        FormsModule
    ],
    providers: [
        FileNamePipe
    ]
})
export class FilePreviewModule {
}
