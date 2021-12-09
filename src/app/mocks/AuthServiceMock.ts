import { Observable, of } from 'rxjs';

export class AuthServiceMock {
    configDetails: any = {
        tokenEndpoint: '',
        oidc: false,
        clientId: '',
        scope: '',
        skipIssuerCheck: true,
        disableAtHashCheck: true
    };
    hasToken = true;
    rcLogin(): Observable<any> {
        return of(null);
    }
    kcLogin(): Observable<any> {
        return of(null);
    }
    initialLogin() {}
    storeRcTokens(rcResponse: any) {}
}
