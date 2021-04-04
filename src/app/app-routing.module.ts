import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'filestore',
        loadChildren: () => import('./view/filestore/filestore.module').then(m => m.FilestoreModule)
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
