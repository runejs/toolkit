import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilestoreIndexComponent } from './filestore-index.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [ FilestoreIndexComponent ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class FilestoreIndexModule {
}
