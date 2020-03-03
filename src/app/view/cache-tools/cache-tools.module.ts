import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CacheToolsRoutingModule } from './cache-tools-routing.module';
import { CacheToolsComponent } from './cache-tools.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [CacheToolsComponent],
    imports: [
        CommonModule,
        CacheToolsRoutingModule,
        MatCardModule
    ]
})
export class CacheToolsModule {
}
