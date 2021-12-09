import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { PASSWORD, PIN } from '../storage-keys';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private capStorage = Storage;
    private passphrase: string;

    constructor() {}

    public hashValue(value: string) {
        return CryptoJS.SHA256(environment.salt + value).toString();
    }

    public storeHashedValue(key: string, value: string): Promise<void> {
        const hashedValue = this.hashValue(value);
        return this.storeValue(key, hashedValue);
    }

    public storeEncryptedValue(key: string, value: string): Promise<void> {
        const encryptedValue = CryptoJS.AES.encrypt(value, this.passphrase).toString();
        return this.storeValue(key, encryptedValue);
    }

    public async getDecryptedValue(key: string): Promise<string | null> {
        const encryptedValue = await this.getValue(key);
        return !!encryptedValue
            ? CryptoJS.AES.decrypt(encryptedValue, this.passphrase).toString(CryptoJS.enc.Utf8)
            : null;
    }

    public async isValidPin(pin: string): Promise<boolean> {
        const storedPinHash = await this.getValue(PIN);
        const hashedPin = this.hashValue(pin);

        if (storedPinHash === hashedPin) {
            this.passphrase = await this.getPassword(pin);
            return true;
        } else {
            if (!environment.pinAuth) {
                console.warn('Did you register the wrong PIN? Try 123456');
            }
            return false;
        }
    }

    public storeValue(key: string, value: string): Promise<void> {
        return this.capStorage.set({ key, value });
    }

    public async getValue(key: string): Promise<string> {
        return (await this.capStorage.get({ key })).value;
    }

    public storePassword(pin: string, newPassword = false): Promise<void> {
        // fast and easy way for generating random strings
        const password = newPassword ? Math.random().toString(20).substr(2, 12) : this.passphrase;
        const encryptedValue = CryptoJS.AES.encrypt(password, environment.salt + pin).toString();
        return this.storeValue(PASSWORD, encryptedValue);
    }

    private async getPassword(pin: string): Promise<string | null> {
        const encryptedValue = await this.getValue(PASSWORD);
        return !!encryptedValue
            ? CryptoJS.AES.decrypt(encryptedValue, environment.salt + pin).toString(CryptoJS.enc.Utf8)
            : null;
    }
}
