import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    constructor(private alertCtrl: AlertController) {}

    public async showAlert(header: string, message: string) {
        const alert = await this.alertCtrl.create({
            header,
            message,
            buttons: ['Okay']
        });
        await alert.present();
    }
}
