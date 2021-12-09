import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryPage } from './entry/entry.page';
import { RegisterPage } from './register/register.page';
import { LoginPage } from './login/login.page';
import { OverviewPage } from './overview/overview.page';
import { MessagePage } from './message/message.page';
import { SaveInputGuard } from '../../guards/save-input.guard';

import { AuthGuard } from '../../guards/auth.guard';
import { CounsellingIntroductionPage } from '../introduction/counselling/counselling-introduction-page.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'messages' },
    { path: 'introduction', component: CounsellingIntroductionPage },
    { path: 'entry', component: EntryPage },
    { path: 'register', component: RegisterPage },
    { path: 'login', component: LoginPage },
    {
        path: 'messages',
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', component: OverviewPage },
            {
                path: ':mode/:id',
                pathMatch: 'full',
                component: MessagePage,
                canDeactivate: [SaveInputGuard]
            },
            {
                path: ':mode',
                pathMatch: 'full',
                component: MessagePage,
                canDeactivate: [SaveInputGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CounsellingRoutingModule {}
