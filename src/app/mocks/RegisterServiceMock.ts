import { Agency } from '../models/agency';
import { of } from 'rxjs';

export class RegisterServiceMock {
    avaliableAgencies: Agency[] = [];
    watingListAgencies: Agency[] = [];
    requestStarted = false;
    public getRegisterStatus() {
        return of(true);
    }
    public handleRegistration(registrationData) {}
    registerUser(registrationData) {
        return of({});
    }
    extractAgencyId() {
        return 1736;
    }
}
