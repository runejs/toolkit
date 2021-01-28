import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpriteComponent } from './sprite.component';

@NgModule({
    declarations: [ SpriteComponent ],
    exports: [
        SpriteComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SpriteModule {
}
