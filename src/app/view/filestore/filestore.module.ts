import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilestoreRoutingModule } from './filestore-routing.module';
import { FilestoreComponent } from './filestore.component';
import { FilestoreIndexComponent } from './filestore-index/filestore-index.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [FilestoreComponent, FilestoreIndexComponent],
    imports: [
        CommonModule,
        FilestoreRoutingModule,
        MatIconModule,
        MatTooltipModule
    ]
})
export class FilestoreModule {
}
