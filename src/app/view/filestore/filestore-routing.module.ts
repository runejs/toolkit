import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilestoreComponent } from './filestore.component';
import { FilestoreRootComponent } from './filestore-root/filestore-root.component';


const routes: Routes = [
    {
        path: '',
        component: FilestoreComponent,
        children: [
            {
                path: '',
                component: FilestoreRootComponent
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
