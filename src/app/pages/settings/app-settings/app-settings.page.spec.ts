import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { AppSettingsPage } from './app-settings.page';
import { PushService } from '../../../services/push.service';
import { PushServiceMock } from 'src/app/mocks/PushServiceMock';

describe('AppSettingsPage', () => {
    let component: AppSettingsPage;
    let fixture: ComponentFixture<AppSettingsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppSettingsPage],
            providers: [{ provide: PushService, useClass: PushServiceMock }],
            imports: [IonicModule, RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(AppSettingsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
