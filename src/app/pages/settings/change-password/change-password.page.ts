import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtilityService } from '../../../services/utility.service';
import { StorageService } from '../../../services/storage.service';
import { U25_USER } from '../../../storage-keys';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'u25-change-password',
    templateUrl: './change-password.page.html',
    styleUrls: ['./change-password.page.scss']
})
export class ChangePasswordPage implements OnInit {
    @ViewChild('changePasswordForm') changePasswordForm: NgForm;

    changePasswordData: { oldPassword: string; newPassword: string; newPasswordCheck: string } = {
        oldPassword: null,
        newPassword: null,
        newPasswordCheck: null
    };

    constructor(
        private utility: UtilityService,
        private storage: StorageService,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit() {}

    submitForm() {
        if (
            this.changePasswordData.oldPassword &&
            this.changePasswordData.newPassword &&
            this.changePasswordData.newPasswordCheck
        ) {
            if (this.changePasswordData.newPassword === this.changePasswordData.newPasswordCheck) {
                this.storage.getDecryptedValue(U25_USER).then((val) => {
                    const object = JSON.parse(val);
                    if (object.password === this.changePasswordData.oldPassword) {
                        this.userService
                            .changePassword(this.changePasswordData.oldPassword, this.changePasswordData.newPassword)
                            .subscribe(
                                () => {
                                    const loginData = {
                                        username: object.username,
                                        password: this.changePasswordData.newPassword
                                    };
                                    this.storage.storeEncryptedValue(U25_USER, JSON.stringify(loginData));
                                    this.router.navigateByUrl('/settings').then(() => {
                                        this.utility.showAlert('Erfolg', 'Passwort wurde erfolgreich aktualisiert');
                                    });
                                },
                                (err) => {
                                    this.utility.showAlert('Server-Fehler', err);
                                    console.log(err);
                                }
                            );
                    } else {
                        this.utility.showAlert('Fehler', 'Altes Passwort ist falsch');
                    }
                });
            } else {
                this.utility.showAlert('Fehler', 'Neues Passwort stimmt nicht überrein');
            }
        } else {
            this.utility.showAlert('Fehler', 'Bitte alle Felder ausfüllen');
        }
    }
}
