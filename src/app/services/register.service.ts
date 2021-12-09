import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { registerStatusUrl, baseUrl, environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Agency } from '../models/agency';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    availableAgencies: Agency[] = [];
    waitingListAgencies: Agency[] = [];
    requestStarted = false;

    constructor(private http: HttpClient) {}

    public getRegisterStatus() {
        return this.http.get(registerStatusUrl).pipe(
            map((res: Agency[]) => {
                // Extracting agencies and putting them into Arrays
                res.forEach((element) => {
                    if (element.registration_status === 'possible') {
                        this.availableAgencies.push(element);
                    } else if (element.registration_status === 'waiting_list') {
                        this.waitingListAgencies.push(element);
                    }
                });
                this.requestStarted = true;
                // returning true or false for register status
                return !(this.availableAgencies.length === 0 && this.waitingListAgencies.length === 0);
            })
        );
    }

    public handleRegistration(registrationData): Observable<any> {
        if (this.requestStarted) {
            return this.registerUser(registrationData);
        } else {
            this.getRegisterStatus().subscribe(() => {
                return this.registerUser(registrationData);
            });
        }
    }

    registerUser(registrationData): Observable<any> {
        const payload = {
            gender: registrationData.gender,
            age: registrationData.age,
            state: registrationData.state,
            username: registrationData.username,
            postcode: '55555',
            agencyId: this.extractAgencyId(),
            password: registrationData.password,
            termsAccepted: registrationData.privacyPolicy,
            consultingType: '1'
        };
        const header = {
            headers: new HttpHeaders({ 'X-U25-APP-CSRF-TOKEN': 'asdafeqfeqq' })
            // Content of X-U25-APP-CSRF-TOKEN value is irrelevant. It just needs to have a value
        };
        const url = baseUrl.userService + '/askers/new';
        return this.http.post(url, payload, header);
    }

    extractAgencyId() {
        let id = null;
        const r = /aid=([0-9]+)/;

        if (!environment.production) {
            id = 1736;
        } else if (this.availableAgencies.length !== 0) {
            const agency = this.availableAgencies[Math.floor(Math.random() * this.availableAgencies.length)];
            id = Number(r.exec(agency.caritas_url)[1]);
        } else if (this.waitingListAgencies.length !== 0) {
            const agency = this.waitingListAgencies[Math.floor(Math.random() * this.waitingListAgencies.length)];
            id = Number(r.exec(agency.caritas_url)[1]);
        }
        return id;
    }
}
