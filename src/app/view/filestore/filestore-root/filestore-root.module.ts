import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilestoreRootComponent } from './filestore-root.component';
import { IndexDetailComponent } from './index-detail/index-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [ FilestoreRootComponent, IndexDetailComponent ],
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule
    ]
})
export class FilestoreRootModule {
}
