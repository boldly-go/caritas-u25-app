import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryOverviewPage } from './diary-overview/diary-overview.page';
import { AddEntryPage } from './add-entry/add-entry.page';
import { DiaryDetailPage } from './diary-detail/diary-detail.page';
import { SaveInputGuard } from 'src/app/guards/save-input.guard';

const routes: Routes = [
    {
        path: '',
        component: DiaryOverviewPage
    },
    {
        path: 'detail/:id',
        pathMatch: 'full',
        component: DiaryDetailPage
    },

    {
        path: 'add-entry',
        component: AddEntryPage,
        canDeactivate: [SaveInputGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiaryRoutingModule {}
