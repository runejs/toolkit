import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { SpriteModule } from '../file-preview/sprite-file-preview/sprite/sprite.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContainerWidgetComponent } from './container-widget/container-widget.component';
import { ScrollbarDirective } from './container-widget/scrollbar.directive';
import { RectangleWidgetComponent } from './rectangle-widget/rectangle-widget.component';
import { ModelWidgetComponent } from './model-widget/model-widget.component';
import { TextWidgetComponent } from './text-widget/text-widget.component';


@NgModule({
    declarations: [
        ScrollbarDirective,
        WidgetComponent,
        ContainerWidgetComponent,
        RectangleWidgetComponent,
        ModelWidgetComponent,
        TextWidgetComponent
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
