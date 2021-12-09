import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { OAuthServiceMock } from '../mocks/OAuthServiceMock';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: OAuthService, useClass: OAuthServiceMock }]
        });
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
