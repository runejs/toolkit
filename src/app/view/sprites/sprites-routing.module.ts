import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpritesComponent } from './sprites.component';


const routes: Routes = [
    {
        path: '',
        component: SpritesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpritesRoutingModule {
}
