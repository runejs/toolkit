import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexNamePipe } from './index-name.pipe';


@NgModule({
    declarations: [ IndexNamePipe ],
    exports: [
        IndexNamePipe
    ],
    imports: [
        CommonModule
    ]
})
export class IndexNameModule {
}
