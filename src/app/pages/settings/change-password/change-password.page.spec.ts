import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangePasswordPage } from './change-password.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { OAuthServiceMock } from 'src/app/mocks/OAuthServiceMock';
import { OAuthService } from 'angular-oauth2-oidc';
import { EqualValueDirective } from '../../../directives/equal-value.directive';

describe('ChangePasswordPage', () => {
    let component: ChangePasswordPage;
    let fixture: ComponentFixture<ChangePasswordPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ChangePasswordPage, EqualValueDirective],
            providers: [{ provide: OAuthService, useClass: OAuthServiceMock }],
            imports: [IonicModule, RouterTestingModule, FormsModule, HttpClientTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ChangePasswordPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
