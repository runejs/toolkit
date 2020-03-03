import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadCacheComponent } from './load-cache.component';

const routes: Routes = [
    {
        path: '',
        component: LoadCacheComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoadCacheRoutingModule {
}
