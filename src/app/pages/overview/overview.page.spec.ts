import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OverviewPage } from './overview.page';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterServiceMock } from 'src/app/mocks/RegisterServiceMock';
import { RegisterService } from 'src/app/services/register.service';

describe('OverviewPage', () => {
    let component: OverviewPage;
    let fixture: ComponentFixture<OverviewPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OverviewPage],
            imports: [IonicModule, RouterTestingModule.withRoutes([])],
            providers: [{ provide: RegisterService, useClass: RegisterServiceMock }]
        }).compileComponents();

        fixture = TestBed.createComponent(OverviewPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
