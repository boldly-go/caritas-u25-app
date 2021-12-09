import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PinGuard } from './guards/pin.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome'
    },
    {
        path: 'counselling',
        loadChildren: () => import('./pages/counselling/counselling.module').then((m) => m.CounsellingModule),
        canActivate: [PinGuard]
    },
    {
        path: 'welcome',
        loadChildren: () => import('./pages/welcome/welcome.module').then((m) => m.WelcomePageModule)
    },
    {
        path: 'overview',
        loadChildren: () => import('./pages/overview/overview.module').then((m) => m.OverviewPageModule),
        canActivate: [PinGuard]
    },
    {
        path: 'introduction',
        loadChildren: () => import('./pages/introduction/introduction.module').then((m) => m.IntroductionModule)
    },
    {
        // no pin guard for all sub pages
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then((m) => m.SettingsPageModule)
    },
    {
        path: 'diary',
        loadChildren: () => import('./pages/diary/diary.module').then((m) => m.DiaryModule),
        canActivate: [PinGuard]
    },
    {
        path: 'info-desk',
        loadChildren: () => import('./pages/infothek/infothek.module').then((m) => m.InfothekPageModule),
        canActivate: [PinGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
