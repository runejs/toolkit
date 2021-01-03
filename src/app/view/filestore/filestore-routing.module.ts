import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilestoreComponent } from './filestore.component';
import { FilestoreRootComponent } from './filestore-root/filestore-root.component';
import { FileIndexComponent } from './file-index/file-index.component';
import { ArchiveComponent } from './archive/archive.component';


const routes: Routes = [
    {
        path: '',
        component: FilestoreComponent,
        children: [
            {
                path: '',
                component: FilestoreRootComponent
            },
            {
                path: 'index/:indexId',
                component: FileIndexComponent
            },
            {
                path: 'index/:indexId/archive/:archiveId',
                component: ArchiveComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class FilestoreRoutingModule {
}
