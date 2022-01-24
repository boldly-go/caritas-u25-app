import { Component, ViewChild } from '@angular/core';
import { UtilityService } from '../../../services/utility.service';
import { NgForm } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { ageOptions, genderOptions, stateOptions } from '../../../api-constants';
import { Browser } from '@capacitor/browser';
import { U25_USER } from '../../../storage-keys';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';
import { PushService } from '../../../services/push.service';

@Component({
    selector: 'u25-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss']
})
export class RegisterPage {
    @ViewChild('registrationForm') registrationForm: NgForm;
    public btnText: 'Lädt...' | 'Registrieren' = 'Registrieren';
    public clickedSubmit = false;
    public ages: number[] = ageOptions;
    public states: number[] = stateOptions;
    public genders: number[] = genderOptions;

    public registrationData = {
        username: null,
        age: null,
        state: null,
        gender: null,
        password: null,
        passwordCheck: null,
        privacyPolicy: null
    };

    constructor(
        private utility: UtilityService,
        private regService: RegisterService,
        private router: Router,
        private authService: AuthService,
        private storage: StorageService,
        private pushService: PushService
    ) {}

    public showInformation(type: 'username' | 'password') {
        switch (type) {
            case 'username':
                this.utility.showAlert(
                    'Benutzername',
                    'Um Deine Anonymität zu schützen, raten wir Dir nicht Deinen tatsächlichen Namen oder Initialien zu verwenden. Wähle bitte einen Benutzername mit min. 5 Zeichen.'
                );
                break;
            case 'password':
                this.utility.showAlert(
                    'Passwort',
                    'Dein Passwort muss folgende Kriterien erfüllen: Groß-/Kleinschreibung, mind. eine Zahl, mind. ein Sonderzeichen, mind. 10 Zeichen'
                );
                break;
        }
    }

    public onSubmit(registrationForm: NgForm) {
        this.clickedSubmit = true;
        this.btnText = 'Lädt...';
        if (registrationForm.valid) {
            this.regService.handleRegistration(this.registrationData).subscribe(
                () => {
                    // Logging in the user after successful registration
                    this.authService
                        .kcLogin(this.registrationData.username, this.registrationData.password)
                        .then(() => {
                            this.authService
                                .rcLogin(this.registrationData.username, this.registrationData.password)
                                .subscribe((rcToken) => {
                                    this.authService.storeRcTokens(rcToken);
                                    if (this.authService.hasToken) {
                                        this.storage.storeEncryptedValue(
                                            U25_USER,
                                            JSON.stringify({
                                                username: this.registrationData.username,
                                                password: this.registrationData.password
                                            })
                                        );
                                        this.pushService.initialize();
                                        this.router.navigateByUrl('/introduction/counselling');
                                    }
                                });
                        });
                },
                (err) => {
                    if (err.status === 409) {
                        this.utility.showAlert(
                            'Benutzernamen vergeben',
                            'Bitte wähle einen anderen Benutzernamen, da dein gewünschter Name schon vergeben ist.'
                        );
                    } else {
                        console.error(err);
                    }
                    this.clickedSubmit = false;
                    this.btnText = 'Registrieren';
                }
            );
        } else {
            this.utility.showAlert(
                'Fehlerhafte Felder',
                'Prüf bitte nochmal, ob du alle Felder ausgefüllt hast und ob dein Passwort die ganzen Anforderungen erfüllt.'
            );
            this.clickedSubmit = false;
            this.btnText = 'Registrieren';
        }
    }

    public onCheckboxChange() {
        // fix for validation, since checkbox "false" fulfills required-validation
        if (!this.registrationData.privacyPolicy) {
            this.registrationData.privacyPolicy = null;
        }
    }

    async openPrivacyDetails() {
        await Browser.open({ url: 'https://www.u25-deutschland.de/datenschutzerklaerung/' });
    }
}
