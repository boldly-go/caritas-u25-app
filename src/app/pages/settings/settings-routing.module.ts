import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsPage } from './settings.page';
import { ChangePasswordPage } from './change-password/change-password.page';
import { ChangePinPage } from './change-pin/change-pin.page';
import { PinGuard } from '../../guards/pin.guard';

const routes: Routes = [
    {
        path: '',
        component: SettingsPage,
        canActivate: [PinGuard]
    },
    {
        path: 'change-pin/:type',
        component: ChangePinPage
    },
    {
        path: 'change-password',
        component: ChangePasswordPage,
        canActivate: [PinGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsPageRoutingModule {}
