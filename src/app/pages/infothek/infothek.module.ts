import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfothekPageRoutingModule } from './infothek-routing.module';

import { InfothekPage } from './infothek.page';
import { InfothekDetailPage } from './infothek-detail/infothek-detail.page';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, InfothekPageRoutingModule],
    declarations: [InfothekPage, InfothekDetailPage]
})
export class InfothekPageModule {}
