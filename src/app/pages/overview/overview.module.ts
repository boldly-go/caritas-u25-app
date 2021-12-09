import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { OverviewPageRoutingModule } from './overview-routing.module';

import { OverviewPage } from './overview.page';

@NgModule({
    imports: [CommonModule, IonicModule, OverviewPageRoutingModule],
    declarations: [OverviewPage]
})
export class OverviewPageModule {}
