import { TestBed } from '@angular/core/testing';
import { OAuthServiceMock } from '../mocks/OAuthServiceMock';

import { AuthGuard } from './auth.guard';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
    let guard: AuthGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
            providers: [{ provide: OAuthService, useClass: OAuthServiceMock }]
        });
        guard = TestBed.inject(AuthGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
