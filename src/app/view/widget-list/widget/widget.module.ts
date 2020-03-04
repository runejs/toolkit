import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { WidgetImageComponent } from './widget-image/widget-image.component';
import { SpritesService } from '../../sprites/sprites.service';

@NgModule({
    declarations: [WidgetComponent, WidgetImageComponent],
    imports: [
        CommonModule
    ],
    exports: [WidgetComponent],
    providers: [SpritesService]
})
export class WidgetModule {
}
