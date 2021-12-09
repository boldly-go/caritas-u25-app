import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { SplashScreen } from '@capacitor/splash-screen';
import { IonicModule } from '@ionic/angular';
import { LockService } from './services/lock.service';
import { LockServiceMock } from './mocks/LockServiceMock';

describe('AppComponent', () => {
    let splashScreenSpy;

    beforeEach(async(() => {
        splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [IonicModule, RouterTestingModule.withRoutes([])],
            providers: [
                { provide: SplashScreen, useValue: splashScreenSpy },
                { provide: LockService, useClass: LockServiceMock }
            ]
        }).compileComponents();
    }));

    it('should create the app', async () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    /* Commented until there are good/easy ways to unit test/mock Capacitor 3 plugins
    TODO: find good ways for unit tests: https://github.com/ionic-team/capacitor/discussions/4252
    it('should initialize the app', async () => {
        TestBed.createComponent(AppComponent);
        expect(Plugins.SplashScreen.hide).toHaveBeenCalledTimes(1);
    }); */
});
