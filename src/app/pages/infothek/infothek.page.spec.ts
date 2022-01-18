import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { InfothekPage } from './infothek.page';
import { InfothekService } from 'src/app/services/infothek.service';
import { InfothekServiceMock } from 'src/app/mocks/InfothekServiceMock';

describe('InfothekPage', () => {
    let component: InfothekPage;
    let fixture: ComponentFixture<InfothekPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [InfothekPage],
            imports: [IonicModule, RouterTestingModule.withRoutes([])],
            providers: [{ provide: InfothekService, useClass: InfothekServiceMock }]
        }).compileComponents();

        fixture = TestBed.createComponent(InfothekPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
