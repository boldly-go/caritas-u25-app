import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegisterService } from './register.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { AuthServiceMock } from '../mocks/AuthServiceMock';
import { OAuthService } from 'angular-oauth2-oidc';
import { OAuthServiceMock } from '../mocks/OAuthServiceMock';

describe('RegisterService', () => {
    let service: RegisterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [
                { provide: AuthService, useClass: AuthServiceMock },
                { provide: OAuthService, useClass: OAuthServiceMock }
            ]
        });
        service = TestBed.inject(RegisterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
