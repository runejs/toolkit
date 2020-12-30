import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilestoreIndexComponent } from './filestore-index.component';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations: [ FilestoreIndexComponent ],
    imports: [
        CommonModule,
        RouterModule,
        MatDividerModule,
        MatIconModule
    ]
})
export class FilestoreIndexModule {
}
