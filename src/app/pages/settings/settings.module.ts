import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { U25SettingsPage } from './u25-settings/u25-settings.page';
import { AppSettingsPage } from './app-settings/app-settings.page';
import { U25PipesModule } from 'src/app/pipes/u25-pipes.module';
import { ChangePasswordPage } from './change-password/change-password.page';
import { ChangePinPage } from './change-pin/change-pin.page';
import { U25DirectivesModule } from 'src/app/directives/u25-directives.module';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, SettingsPageRoutingModule, U25PipesModule, U25DirectivesModule],
    declarations: [SettingsPage, U25SettingsPage, AppSettingsPage, ChangePasswordPage, ChangePinPage]
})
export class SettingsPageModule {}
