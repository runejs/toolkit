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
        path: 'cache-tools',
        loadChildren: () => import('./view/cache-tools/cache-tools.module').then(m => m.CacheToolsModule)
    },
    {
        path: '',
        loadChildren: () => import('./view/load-cache/load-cache.module').then(m => m.LoadCacheModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
