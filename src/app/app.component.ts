import { Component } from '@angular/core';
import '@capacitor/core';
import { Config, Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { LockService } from './services/lock.service';
import { MenuController } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'u25-app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public selectedIndex = 0;
    public appPages = [
        {
            title: 'Meine Beratung',
            url: 'counselling'
        },
        {
            title: 'Mein Tagebuch',
            url: 'diary'
        },
        {
            title: 'Infothek',
            url: 'info-desk'
        },
        {
            title: 'Einstellungen',
            url: 'settings'
        }
    ];

    constructor(
        private config: Config,
        private platform: Platform,
        private router: Router,
        private lockService: LockService,
        private menu: MenuController
    ) {
        this.router.events.pipe(filter((value: RouterEvent) => value instanceof NavigationEnd)).subscribe((value) => {
            const selected = value.url.split('/')[1].toLowerCase();
            this.selectedIndex = this.appPages.findIndex((page) => page.url === selected);
        });
        this.initializeApp();
    }

    clickMenuItem() {
        this.menu.close();
    }

    initializeApp() {
        SplashScreen.hide();

        this.lockService.activatePinSecurity();
    }
}
