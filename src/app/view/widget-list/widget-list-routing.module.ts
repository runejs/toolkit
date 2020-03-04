import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WidgetListComponent } from './widget-list.component';


const routes: Routes = [
    {
        path: '',
        component: WidgetListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WidgetListRoutingModule {
}
