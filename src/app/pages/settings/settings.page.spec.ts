import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SettingsPage } from './settings.page';
import { OAuthService } from 'angular-oauth2-oidc';
import { OAuthServiceMock } from 'src/app/mocks/OAuthServiceMock';
import { U25DirectivesModule } from 'src/app/directives/u25-directives.module';
import { SettingsPageModule } from './settings.module';
import { AuthService } from 'src/app/services/auth.service';
import { AuthServiceMock } from 'src/app/mocks/AuthServiceMock';

describe('SettingsPage', () => {
    let component: SettingsPage;
    let fixture: ComponentFixture<SettingsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SettingsPage],
            providers: [
                { provide: OAuthService, useClass: OAuthServiceMock },
                { provide: AuthService, useClass: AuthServiceMock }
            ],
            imports: [
                IonicModule,
                RouterTestingModule,
                HttpClientTestingModule,
                U25DirectivesModule,
                SettingsPageModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
