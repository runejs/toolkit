import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { SpriteModule } from '../file-preview/sprite-file-preview/sprite/sprite.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContainerWidgetComponent } from './container-widget/container-widget.component';
import { ScrollbarDirective } from './container-widget/scrollbar.directive';


@NgModule({
    declarations: [
        ScrollbarDirective,
        WidgetComponent,
        ContainerWidgetComponent
    ],
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
