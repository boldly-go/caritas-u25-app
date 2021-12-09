import { Injectable } from '@angular/core';
import { IAppSecurity } from '../models/app-security';
import { PIN, SECURITY_QUESTION, SECURITY_RESPONSE } from '../storage-keys';
import { StorageService } from './storage.service';
import { App, AppState } from '@capacitor/app';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class LockService {
    public isUnlocked = false;
    public redirectUrl: string;

    constructor(private storage: StorageService, private router: Router, private auth: AuthService) {}

    public async hasPin(): Promise<boolean> {
        const hasPin = await this.storage.getValue(PIN);
        return !!hasPin;
    }

    public initializePinLock(form: IAppSecurity): Promise<void | void[]> {
        return Promise.all([
            this.storage.storeValue(SECURITY_QUESTION, form.securityQuestion),
            this.storage.storeHashedValue(SECURITY_RESPONSE, form.securityResponse.trim().toLowerCase()),
            this.storage.storeHashedValue(PIN, String(form.pin)),
            this.storage.storePassword(form.pin.toString(), true)
        ]);
    }

    public changePin(newPin: string) {
        this.storage.storeHashedValue(PIN, newPin);
    }

    public async unlockApp(pin: string): Promise<boolean> {
        this.isUnlocked = await this.storage.isValidPin(pin);
        this.auth.initialLogin();
        return this.isUnlocked;
    }

    public activatePinSecurity() {
        App.addListener('appStateChange', (state: AppState) => {
            if (!state.isActive) {
                this.isUnlocked = false;
                this.router.navigate(['/welcome'], { replaceUrl: true });
            }
        });
    }
}
