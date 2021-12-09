import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CounsellingRoutingModule } from './counselling-routing.module';
import { U25DirectivesModule } from '../../directives/u25-directives.module';
import { EntryPage } from './entry/entry.page';
import { RegisterPage } from './register/register.page';
import { LoginPage } from './login/login.page';
import { OverviewPage } from './overview/overview.page';
import { MessageItemComponent } from './overview/message-item/message-item.component';
import { MessagePage } from './message/message.page';
import { U25PipesModule } from 'src/app/pipes/u25-pipes.module';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, CounsellingRoutingModule, U25DirectivesModule, U25PipesModule],
    declarations: [EntryPage, RegisterPage, LoginPage, OverviewPage, MessageItemComponent, MessagePage]
})
export class CounsellingModule {}
