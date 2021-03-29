import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { SpriteModule } from '../file-preview/sprite-file-preview/sprite/sprite.module';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [ WidgetComponent ],
    exports: [
        WidgetComponent
    ],
  imports: [
    CommonModule,
    SpriteModule,
    MatTooltipModule
  ]
})
export class WidgetModule {
}
