import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadFilestoreRoutingModule } from './load-filestore-routing.module';
import { LoadFilestoreComponent } from './load-filestore.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [LoadFilestoreComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSnackBarModule,
        LoadFilestoreRoutingModule,
        MatIconModule
    ]
})
export class LoadFilestoreModule {
}
