import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilestoreRoutingModule } from './filestore-routing.module';
import { FilestoreComponent } from './filestore.component';
import { FilestoreRootModule } from './filestore-root/filestore-root.module';
import { FilestoreIndexModule } from './filestore-index/filestore-index.module';


@NgModule({
    declarations: [ FilestoreComponent ],
    imports: [
        CommonModule,
        FilestoreRoutingModule,
        FilestoreRootModule,
        FilestoreIndexModule
    ]
})
export class FilestoreModule {
}
