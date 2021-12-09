import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import { PinCreateFormComponent } from './create-form/pin-create-form.component';
import { U25DirectivesModule } from '../../directives/u25-directives.module';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, WelcomePageRoutingModule, U25DirectivesModule],
    declarations: [WelcomePage, PinCreateFormComponent]
})
export class WelcomePageModule {}
