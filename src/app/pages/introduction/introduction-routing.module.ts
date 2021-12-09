import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounsellingIntroductionPage } from './counselling/counselling-introduction-page.component';
import { AppIntroductionPage } from './app/app-introduction.page';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'app',
                component: AppIntroductionPage
            },
            {
                path: 'counselling',
                component: CounsellingIntroductionPage
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IntroductionRoutingModule {}
