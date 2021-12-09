import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WelcomePage } from './welcome.page';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AppIntroductionPage } from '../introduction/app/app-introduction.page';
import { LockService } from 'src/app/services/lock.service';
import { LockServiceMock } from 'src/app/mocks/LockServiceMock';

describe('WelcomePage', () => {
    let component: WelcomePage;
    let fixture: ComponentFixture<WelcomePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WelcomePage],
            imports: [
                RouterTestingModule.withRoutes([{ path: 'introduction/app', component: AppIntroductionPage }]),
                IonicModule,
                FormsModule
            ],
            providers: [{ provide: LockService, useClass: LockServiceMock }]
        }).compileComponents();

        fixture = TestBed.createComponent(WelcomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
