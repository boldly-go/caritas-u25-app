import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { encode } from 'hi-base32';
import { baseUrl } from '../../environments/environment';
import { StorageService } from './storage.service';
import { RC_TOKEN, RC_USER_ID, U25_USER, PASSWORD } from '../storage-keys';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    hasToken = false;

    configDetails: any = {
        tokenEndpoint: baseUrl.kc + '/token',
        oidc: false,
        clientId: 'app',
        scope: 'openid',
        skipIssuerCheck: true,
        disableAtHashCheck: true
    };

    constructor(private oauthService: OAuthService, private http: HttpClient, private storageService: StorageService) {
        this.hasToken = this.oauthService.hasValidAccessToken();
        this.oauthService.tokenEndpoint = this.configDetails.tokenEndpoint;
        this.oauthService.oidc = this.configDetails.oidc;
        this.oauthService.clientId = this.configDetails.clientId;
        this.oauthService.scope = this.configDetails.scope;
        this.oauthService.skipIssuerCheck = this.configDetails.skipIssuerCheck;
        this.oauthService.disableAtHashCheck = this.configDetails.disableAtHashCheck;
        timer(0, 240_000).subscribe(() => {
            this.hasToken = this.oauthService.hasValidAccessToken();
            if (this.hasToken) {
                this.oauthService.refreshToken();
            }
        });
    }

    encodeUsername(username) {
        return 'enc.' + encode(username).replace(/=/gi, '.');
    }

    kcLogin(username: string, password: string) {
        return this.oauthService.fetchTokenUsingPasswordFlow(this.encodeUsername(username), password).then(() => {
            this.hasToken = this.oauthService.hasValidAccessToken();
        });
    }

    rcLogin(username: string, password: string): Observable<any> {
        const body = { username: this.encodeUsername(username), ldap: true, ldapOptions: {}, ldapPass: password };
        return this.http.post(baseUrl.rc + '/login', body);
    }

    async initialLogin() {
        const user = JSON.parse(await this.storageService.getDecryptedValue(U25_USER));
        if (user) {
            this.kcLogin(user.username, user.password);
            this.rcLogin(user.username, user.password);
        }
    }

    storeRcTokens(rcResponse: any) {
        const token = rcResponse.data.authToken;
        const userId = rcResponse.data.userId;
        this.storageService.storeEncryptedValue(RC_TOKEN, token);
        this.storageService.storeEncryptedValue(RC_USER_ID, userId);
    }
}
