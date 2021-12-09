import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { U25SettingsPage } from './u25-settings.page';
import { OAuthServiceMock } from 'src/app/mocks/OAuthServiceMock';
import { OAuthService } from 'angular-oauth2-oidc';
import { U25PipesModule } from 'src/app/pipes/u25-pipes.module';

describe('U25SettingsPage', () => {
    let component: U25SettingsPage;
    let fixture: ComponentFixture<U25SettingsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [U25SettingsPage],
            imports: [IonicModule, RouterTestingModule, HttpClientTestingModule, U25PipesModule],
            providers: [{ provide: OAuthService, useClass: OAuthServiceMock }]
        }).compileComponents();

        fixture = TestBed.createComponent(U25SettingsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
