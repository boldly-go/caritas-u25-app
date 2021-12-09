import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { IntroductionRoutingModule } from './introduction-routing.module';
import { U25ComponentsModule } from '../../components/u25-components.module';
import { CounsellingIntroductionPage } from './counselling/counselling-introduction-page.component';
import { AppIntroductionPage } from './app/app-introduction.page';

@NgModule({
    imports: [CommonModule, IonicModule, IntroductionRoutingModule, U25ComponentsModule],
    declarations: [AppIntroductionPage, CounsellingIntroductionPage]
})
export class IntroductionModule {}
