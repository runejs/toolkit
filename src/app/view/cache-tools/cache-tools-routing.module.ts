import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CacheToolsComponent } from './cache-tools.component';

const routes: Routes = [
    {
        path: '',
        component: CacheToolsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CacheToolsRoutingModule {
}
