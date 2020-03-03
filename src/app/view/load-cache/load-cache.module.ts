import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadCacheRoutingModule } from './load-cache-routing.module';
import { LoadCacheComponent } from './load-cache.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [LoadCacheComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSnackBarModule,
        LoadCacheRoutingModule,
    ]
})
export class LoadCacheModule {
}
