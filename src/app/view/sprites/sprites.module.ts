import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpritesRoutingModule } from './sprites-routing.module';
import { SpritesComponent } from './sprites.component';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
    declarations: [SpritesComponent],
    imports: [
        CommonModule,
        MatGridListModule,
        SpritesRoutingModule
    ]
})
export class SpritesModule {
}
