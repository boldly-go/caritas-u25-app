import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PushService } from '../../../services/push.service';
import { Browser } from '@capacitor/browser';

@Component({
    selector: 'u25-app-settings',
    templateUrl: './app-settings.page.html',
    styleUrls: ['./app-settings.page.scss']
})
export class AppSettingsPage {
    constructor(private router: Router, public pushService: PushService) {}

    editPin() {
        this.router.navigateByUrl('/settings/change-pin/pin');
    }

    togglePushNotifications(event: any) {
        if (event.detail.checked) {
            this.pushService.activate();
        } else {
            this.pushService.deactivate();
        }
    }

    async openPage(url: string) {
        await Browser.open({ url });
    }
}
