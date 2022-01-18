import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { OAuthServiceMock } from '../../../mocks/OAuthServiceMock';
import { LoginPage } from './login.page';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OverviewPage } from '../overview/overview.page';

import { AuthService } from 'src/app/services/auth.service';
import { AuthServiceMock } from '../../../mocks/AuthServiceMock';

describe('LoginPage', () => {
    let component: LoginPage;
    let fixture: ComponentFixture<LoginPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LoginPage, OverviewPage],
            imports: [
                RouterTestingModule.withRoutes([{ path: 'counselling/messages', component: OverviewPage }]),
                IonicModule,
                FormsModule,
                HttpClientTestingModule
            ],
            providers: [
                { provide: OAuthService, useClass: OAuthServiceMock },
                { provide: AuthService, useClass: AuthServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
