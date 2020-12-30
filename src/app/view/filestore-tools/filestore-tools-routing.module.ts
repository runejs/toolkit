import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilestoreToolsComponent } from './filestore-tools.component';

const routes: Routes = [
    {
        path: '',
        component: FilestoreToolsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FilestoreToolsRoutingModule {
}
