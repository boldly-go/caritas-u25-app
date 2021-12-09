import { TestBed } from '@angular/core/testing';

import { LockService } from './lock.service';
import { RouterTestingModule } from '@angular/router/testing';
import { OAuthService } from 'angular-oauth2-oidc';
import { OAuthServiceMock } from '../mocks/OAuthServiceMock';
import { AuthService } from './auth.service';
import { AuthServiceMock } from '../mocks/AuthServiceMock';

describe('LockService', () => {
    let service: LockService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                { provide: AuthService, useClass: AuthServiceMock },
                { provide: OAuthService, useClass: OAuthServiceMock }
            ]
        });
        service = TestBed.inject(LockService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
