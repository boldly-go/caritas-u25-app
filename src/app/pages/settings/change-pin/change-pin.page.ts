import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StorageService } from '../../../services/storage.service';
import { UtilityService } from '../../../services/utility.service';
import { PIN, SECURITY_QUESTION, SECURITY_RESPONSE } from '../../../storage-keys';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'u25-change-pin',
    templateUrl: './change-pin.page.html',
    styleUrls: ['./change-pin.page.scss']
})
export class ChangePinPage implements OnInit {
    @ViewChild('changePinForm') changePinForm: NgForm;
    forgotPin = false;

    changePinData: { oldPin: string; newPin: string; newPinCheck: string; securityResponse: string } = {
        oldPin: undefined,
        newPin: undefined,
        newPinCheck: undefined,
        securityResponse: undefined
    };

    secQuestion = null;

    constructor(
        private storage: StorageService,
        private utility: UtilityService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.storage.getValue(SECURITY_QUESTION).then((val) => {
            this.secQuestion = val;
        });

        this.route.params.subscribe((params) => {
            if (params.type === 'question') {
                this.forgotPin = true;
            }
        });
    }

    clickedForgotPin() {
        this.forgotPin = !this.forgotPin;
    }

    submitForm() {
        if (this.forgotPin) {
            this.changePINbySecurityQuestion();
        } else {
            this.changePINbyOldPIN();
        }
    }

    changePINbySecurityQuestion() {
        if (this.changePinData.securityResponse && this.changePinData.newPin && this.changePinData.newPinCheck) {
            const hashedSecurityResponse = this.storage.hashValue(
                this.changePinData.securityResponse.trim().toLowerCase()
            );
            this.storage.getValue(SECURITY_RESPONSE).then((val) => {
                if (val === hashedSecurityResponse) {
                    this.updatePin();
                } else {
                    this.utility.showAlert('Falsche Antwort', 'Du hast die Sicherheitsfrage leider falsch beantwortet');
                }
            });
        } else {
            this.utility.showAlert('Fehler', 'Bitte alle Felder ausfüllen');
        }
    }

    changePINbyOldPIN() {
        if (this.changePinData.oldPin && this.changePinData.newPin && this.changePinData.newPinCheck) {
            const hashedOldPin = this.storage.hashValue(this.changePinData.oldPin);
            this.storage.getValue(PIN).then((val) => {
                if (val === hashedOldPin) {
                    this.updatePin();
                } else {
                    this.utility.showAlert('Falsche PIN', 'Du hast die falsche PIN eingegeben');
                }
            });
        } else {
            this.utility.showAlert('Fehler', 'Bitte alle Felder ausfüllen');
        }
    }

    private updatePin() {
        if (this.changePinForm.form.controls.newPinCheck.errors?.notEqual) {
            this.utility.showAlert(
                'PINs stimmen nicht überein',
                'Deine eingegebenen PINs stimmen leider nicht überein'
            );
        } else {
            this.storage.storeHashedValue(PIN, this.changePinData.newPin);
            this.storage.storePassword(this.changePinData.newPin);
            this.changePinData.oldPin = null;
            this.changePinData.newPin = null;
            this.changePinData.newPinCheck = null;
            this.router.navigateByUrl('/settings').then(() => {
                this.utility.showAlert('Erfolg', 'PIN wurde erfolgreich geändert');
            });
        }
    }
}
