import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { U25_USER } from '../../../storage-keys';
import { StorageService } from '../../../services/storage.service';
import { PushService } from '../../../services/push.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
    selector: 'u25-register',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
    @ViewChild('loginForm') loginForm: NgForm;

    public loginData = {
        username: null,
        password: null
    };

    constructor(
        private router: Router,
        private authService: AuthService,
        private storage: StorageService,
        private pushService: PushService,
        private utility: UtilityService
    ) {}

    ngOnInit() {
        if (this.authService.hasToken) {
            this.router.navigateByUrl('/counselling/messages');
        }
    }

    public onSubmit() {
        if (this.loginForm.valid) {
            this.authService
                .kcLogin(this.loginData.username, this.loginData.password)
                .then(() => {
                    this.authService.rcLogin(this.loginData.username, this.loginData.password).subscribe((rcToken) => {
                        this.authService.storeRcTokens(rcToken);
                        if (this.authService.hasToken) {
                            this.storage.storeEncryptedValue(U25_USER, JSON.stringify(this.loginData));
                            this.pushService.initialize();
                            this.router.navigateByUrl('/counselling/messages');
                        }
                    });
                })
                .catch((err) => {
                    if (err.status === 401) {
                        this.utility.showAlert(
                            'Fehler beim Login',
                            'Dein Benutzername oder Passwort scheinen nicht zu stimmen. Bitte überprüfe diese nochmal.'
                        );
                    }
                });
        }
    }
}
