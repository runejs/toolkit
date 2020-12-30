import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'widgets',
        loadChildren: () => import('./view/widget-list/widget-list.module').then(m => m.WidgetListModule)
    },
    {
        path: 'sprites',
        loadChildren: () => import('./view/sprites/sprites.module').then(m => m.SpritesModule)
    },
    {
        path: 'filestore',
        loadChildren: () => import('./view/filestore/filestore.module').then(m => m.FilestoreModule)
    },
    {
        path: '',
        loadChildren: () => import('./view/load-filestore/load-filestore.module').then(m => m.LoadFilestoreModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
