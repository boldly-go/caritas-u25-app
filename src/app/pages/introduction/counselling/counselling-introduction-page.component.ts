import { Component, ViewChild } from '@angular/core';
import { IonSlides, MenuController } from '@ionic/angular';
import { ISlideContent } from '../../../models/slider-content';
import { Router } from '@angular/router';
import { WATCH_COUNSELLING_INSTRUCTIONS } from '../../../storage-keys';
import { StorageService } from '../../../services/storage.service';

@Component({
    selector: 'u25-counselling-introduction',
    templateUrl: './counselling-introduction-page.component.html',
    styleUrls: ['./counselling-introduction-page.component.scss']
})
export class CounsellingIntroductionPage {
    @ViewChild('slider') slider: IonSlides;

    public isEnd = false;
    public slidesContent: ISlideContent[] = [
        {
            title: 'Beratung - So funktionierts.',
            imgSrc: '/assets/u25_logo.svg',
            subtitle: 'Datensicherheit',
            icon: 'lock-closed-outline',
            description:
                'Deine Nachrichten werden ausschließlich an die Caritas ' +
                'gesendet, damit die dir zugewiesenen Berater*Innen mit dir ' +
                'kommunizieren können. Deine Daten werden nicht weitergegeben.'
        },
        {
            title: 'Beratung - So funktionierts.',
            imgSrc: '/assets/u25_logo.svg',
            subtitle: 'Beratungspartner',
            icon: 'person-outline',
            description:
                'Die Beratung wird durch speziell ausgebildete ehrenamtliche Gleichaltrige („Peers“) durchgeführt. ' +
                'Im Hintergrund sind hauptamtliche Fachkräfte tätig.'
        },
        {
            title: 'Beratung - So funktionierts.',
            imgSrc: '/assets/u25_logo.svg',
            subtitle: 'Anonymität',
            icon: 'eye-off-outline',
            description:
                'Die Beratung ist kostenlos und anonym. Du meldest dich anonym mit einem Nickname an. ' +
                'Das dauert eine Minute und schon kannst du uns schreiben.'
        },
        {
            title: 'Beratung - So funktionierts.',
            imgSrc: '/assets/u25_logo.svg',
            subtitle: 'Antwortzyklus',
            icon: 'chatbubble-outline',
            description:
                'Du schreibst uns dein Anliegen und schickst die Nachricht ab. Wir lesen deine Mail ' +
                'und antworten dir innerhalb von 2 Werktagen. Das kann der Anfang einer längeren Mail-Begleitung sein ' +
                '– wenn du das möchtest. Bei den weiteren Mails antworten wir dir innerhalb von 7 Tagen.'
        },
        {
            title: 'Beratung - So funktionierts.',
            imgSrc: '/assets/u25_logo.svg',
            subtitle: 'Schweigepflicht',
            icon: 'chatbubble-ellipses-crossed-outline',
            description:
                'Deine Mails werden durch deinen Peer sowie die hauptamtlichen Fachkräfte gelesen. ' +
                'Wir unterliegen der Schweigepflicht.'
        },
        {
            title: 'Beratung - So funktionierts.',
            imgSrc: '/assets/u25_logo.svg',
            subtitle: 'Wichtiger Hinweis',
            icon: 'alert-circle-outline',
            description:
                'Die Beratung bei [U25] ersetzt keine professionelle Behandlung bzw. Therapie. ' +
                'Alle unsere Berater*innen sind ehrenamtliche Mitarbeiter*innen und keine Ärzt*innen, ' +
                'Psycholog*innen oder Therapeut*innen.'
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

    public async onSlideChanged() {
        this.isEnd = await this.slider.isEnd();
    }

    public endSlider() {
        this.storage.storeValue(WATCH_COUNSELLING_INSTRUCTIONS, '1');
        this.router.navigate(['/counselling/messages'], { replaceUrl: true });
    }
}
