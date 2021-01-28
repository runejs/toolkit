import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { SpriteModule } from '../file-preview/sprite-file-preview/sprite/sprite.module';


@NgModule({
    declarations: [ WidgetComponent ],
    exports: [
        WidgetComponent
    ],
    imports: [
        CommonModule,
        SpriteModule
    ]
})
export class WidgetModule {
}
