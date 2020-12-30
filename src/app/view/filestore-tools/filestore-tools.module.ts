import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilestoreToolsRoutingModule } from './filestore-tools-routing.module';
import { FilestoreToolsComponent } from './filestore-tools.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [FilestoreToolsComponent],
    imports: [
        CommonModule,
        FilestoreToolsRoutingModule,
        MatCardModule
    ]
})
export class FilestoreToolsModule {
}
