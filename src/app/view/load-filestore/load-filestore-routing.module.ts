import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadFilestoreComponent } from './load-filestore.component';

const routes: Routes = [
    {
        path: '',
        component: LoadFilestoreComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoadFilestoreRoutingModule {
}
