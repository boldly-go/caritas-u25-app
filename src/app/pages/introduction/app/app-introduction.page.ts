import { Component, ViewChild } from '@angular/core';
import { ISlideContent } from '../../../models/slider-content';
import { IonSlides, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { WATCH_APP_INSTRUCTIONS } from '../../../storage-keys';

@Component({
    selector: 'u25-app-introduction',
    templateUrl: './app-introduction.page.html',
    styleUrls: ['./app-introduction.page.scss']
})
export class AppIntroductionPage {
    @ViewChild('slider') slider: IonSlides;

    public btnText = 'Intro überspringen';
    public slidesContent: ISlideContent[] = [
        {
            title: 'App Einführung',
            imgSrc: '/assets/u25_logo.svg',
            subtitle: 'Datensicherheit',
            icon: 'lock-closed-outline',
            description: 'Deine Daten sind bei uns sicher und werden nicht weitergegeben.'
        },
        {
            title: 'App Einführung',
            imgSrc: '/assets/u25_logo.svg',
            subtitle: 'Speicherung',
            icon: 'phone-portrait-outline',
            description:
                'Dein Tagebuch und deine Entwürfe werden verschlüsselt und nur lokal auf deinem Smartphone gespeichert.'
        },
        {
            title: 'App Einführung',
            imgSrc: '/assets/u25_logo.svg',
            subtitle: 'SicherheitsPIN',
            icon: 'key-outline',
            description:
                'Du sicherst diese App mit einer PIN. Wähle einen PIN, den nur du kennst, um deine Nachrichten und Tagebucheinträge privat zu halten.'
        }
    ];

    constructor(private router: Router, private storage: StorageService, private menu: MenuController) {}

    ionViewWillEnter() {
        this.menu.enable(false);
        this.menu.swipeGesture(false);
    }

    ionViewWillLeave() {
        this.menu.enable(true);
    }

    public onSlideChanged() {
        this.slider.isEnd()
            .then(isEnd => this.btnText = !isEnd ? 'Intro überspringen' : 'Intro beenden');
    }

    public endSlider() {
        this.storage.storeValue(WATCH_APP_INSTRUCTIONS, '1');
        this.router.navigate(['welcome']);
    }
}
