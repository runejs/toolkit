import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilestoreComponent } from './filestore.component';


const routes: Routes = [
    {
        path: '',
        component: FilestoreComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FilestoreRoutingModule {
}
