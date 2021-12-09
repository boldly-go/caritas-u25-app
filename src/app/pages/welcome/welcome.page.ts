import { Component, OnInit, ViewChild } from '@angular/core';
import { LockService } from '../../services/lock.service';
import { PinCreateFormComponent } from './create-form/pin-create-form.component';
import { Router } from '@angular/router';
import { UtilityService } from '../../services/utility.service';
import { MenuController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { WATCH_APP_INSTRUCTIONS } from '../../storage-keys';

@Component({
    selector: 'u25-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss']
})
export class WelcomePage implements OnInit {
    @ViewChild('pinCreateForm') pinCreateForm: PinCreateFormComponent;

    displayCreationForm = false;
    pin: string | null = null;

    constructor(
        private lockService: LockService,
        private router: Router,
        private utility: UtilityService,
        private menu: MenuController,
        private storageService: StorageService
    ) {}

    ngOnInit() {
        this.storageService.getValue(WATCH_APP_INSTRUCTIONS).then((value) => {
            if (!value && value !== '1') {
                this.router.navigateByUrl('/introduction/app');
            }
        });
        this.lockService.hasPin().then((hasPin) => (this.displayCreationForm = !hasPin));
    }

    ionViewWillEnter() {
        this.menu.enable(false);
        this.menu.swipeGesture(false);
    }

    ionViewWillLeave() {
        this.menu.enable(true);
    }

    public async submitForm() {
        if (this.pin) {
            this.lockService.unlockApp(this.pin).then(async (unlocked) => {
                if (unlocked) {
                    const route = this.lockService.redirectUrl || '/overview';
                    this.pin = null;
                    await this.router.navigate([route], { replaceUrl: true });
                } else {
                    await this.utility.showAlert('Falsche PIN', 'Die angegebene PIN ist leider falsch');
                }
            });
        } else {
            if (this.pinCreateForm.form.valid) {
                await this.lockService.initializePinLock(this.pinCreateForm.appSecurity);
                await this.lockService.unlockApp(String(this.pinCreateForm.appSecurity.pin));
                await this.router.navigate(['/overview'], { replaceUrl: true });
            } else {
                if (this.pinCreateForm.form.controls.pin_check.errors?.notEqual) {
                    await this.utility.showAlert('Falsche PIN', 'Deine eingegebenen PINs stimmen leider nicht überein');
                } else {
                    await this.utility.showAlert(
                        'Felder fehlen',
                        'Bitte prüfe, ob du alle Felder (richtig) gefüllt hast'
                    );
                }
            }
        }
    }
}
