import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpritesRoutingModule } from './sprites-routing.module';
import { SpritesComponent } from './sprites.component';
import { SpriteDialogComponent } from './sprite-dialog/sprite-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
    declarations: [SpritesComponent, SpriteDialogComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        SpritesRoutingModule
    ]
})
export class SpritesModule {
}
