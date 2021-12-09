import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../../environments/environment';
import { map, mergeMap } from 'rxjs/operators';
import { User } from '../models/user';
import { UserInfo } from '../models/users-data/user-info';
import { OAuthService } from 'angular-oauth2-oidc';
import { StorageService } from './storage.service';
import { RC_TOKEN, RC_USER_ID } from '../storage-keys';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient, private oAuthService: OAuthService, private storageService: StorageService) {}
    private userDataObservable: Observable<any>;
    dataEndpoint = '/data';
    changePasswordEndpoint = '/password/change';

    public getUserData(): Observable<User> {
        if (this.userDataObservable) {
            return this.userDataObservable;
        }
        const rcTokenPromise = this.storageService.getDecryptedValue(RC_TOKEN);
        const rcUidPromise = this.storageService.getDecryptedValue(RC_USER_ID);
        this.userDataObservable = forkJoin([rcTokenPromise, rcUidPromise]).pipe(
            mergeMap(([rcToken, rcUserId]) => {
                const url = baseUrl.userService + this.dataEndpoint;
                const header = {
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + this.oAuthService.getAccessToken(),
                        rcToken,
                        rcUserId,
                        'X-U25-APP-CSRF-TOKEN': 'asdafeqfeqq'
                    })
                    // Content of X-U25-APP-CSRF-TOKEN value is irrelevant. It just needs to have a value
                };
                return this.http.get<UserInfo>(url, header).pipe(
                    map((val: UserInfo) => {
                        if (val) {
                            return new User(val.userName, val.consultingTypes[1]);
                        }
                    })
                );
            })
        );
        return this.userDataObservable;
    }

    public changePassword(oldPassword: string, newPassword: string): Observable<object> {
        const rcTokenPromise = this.storageService.getDecryptedValue(RC_TOKEN);
        const rcUidPromise = this.storageService.getDecryptedValue(RC_USER_ID);
        return forkJoin([rcTokenPromise, rcUidPromise]).pipe(
            mergeMap(([rcToken, rcUserId]) => {
                const url = baseUrl.userService + '/password/change';
                const body = { oldPassword, newPassword };
                const header = {
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + this.oAuthService.getAccessToken(),
                        rcToken,
                        rcUserId,
                        'X-U25-APP-CSRF-TOKEN': 'asdafeqfeqq'
                    })
                };
                return this.http.put(url, body, header);
            })
        );
    }

    public registerFcmToken(token: string): Observable<object> {
        const url = baseUrl.userService + '/mobiletoken';
        const body = { token };
        const header = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.oAuthService.getAccessToken(),
                'X-U25-APP-CSRF-TOKEN': 'asdafeqfeqq'
            })
        };
        return this.http.put(url, body, header);
    }
}
