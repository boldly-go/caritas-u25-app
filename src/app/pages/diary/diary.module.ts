import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryOverviewPage } from './diary-overview/diary-overview.page';
import { AddEntryPage } from './add-entry/add-entry.page';
import { DiaryDetailPage } from './diary-detail/diary-detail.page';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, DiaryRoutingModule],
    declarations: [DiaryOverviewPage, AddEntryPage, DiaryDetailPage]
})
export class DiaryModule {}
