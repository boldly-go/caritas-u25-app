import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfothekPage } from './infothek.page';
import { InfothekDetailPage } from './infothek-detail/infothek-detail.page';
import { PinGuard } from 'src/app/guards/pin.guard';

const routes: Routes = [
    {
        path: '',
        component: InfothekPage,
        canActivate: [PinGuard]
    },
    {
        path: 'detail/:index',
        component: InfothekDetailPage,
        pathMatch: 'full',
        canActivate: [PinGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InfothekPageRoutingModule {}
