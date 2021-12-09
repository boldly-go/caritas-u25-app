import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { RegisterService } from 'src/app/services/register.service';
import { StorageService } from '../../services/storage.service';
import { U25_USER } from '../../storage-keys';

@Component({
    selector: 'u25-overview',
    templateUrl: './overview.page.html',
    styleUrls: ['./overview.page.scss']
})
export class OverviewPage implements OnInit {
    public userNotLoggedIn = false;
    public cards: ICardContent[] = [
        {
            icon: 'mail-outline',
            title: 'Beratung',
            subtitle: 'Neuregistrierung derzeit nicht möglich',
            link: '/counselling'
        },
        { icon: 'reader-outline', title: 'Tagebuch', link: '/diary' },
        { icon: 'information-circle-outline', title: 'Infothek', link: '/info-desk' },
        { icon: 'person-outline', title: 'Profil und Einstellungen', link: '/settings' }
    ];

    constructor(private menu: MenuController, private regService: RegisterService, private storage: StorageService) {}

    ngOnInit() {
        this.regService.getRegisterStatus().subscribe((status) => {
            if (status) {
                this.cards[0].subtitle = 'Neuregistrierung möglich';
            }
        });
        this.storage.getDecryptedValue(U25_USER).then((user) => {
            this.userNotLoggedIn = !user;
        });
    }

    ionViewWillEnter() {
        this.menu.enable(false);
        this.menu.swipeGesture(false);
    }

    ionViewWillLeave() {
        this.menu.enable(true);
    }
}

interface ICardContent {
    icon: string;
    title: string;
    subtitle?: string;
    link: string;
}
