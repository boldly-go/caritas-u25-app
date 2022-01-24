import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfothekDetailPage } from './infothek-detail.page';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InfothekService } from 'src/app/services/infothek.service';
import { InfothekServiceMock } from 'src/app/mocks/InfothekServiceMock';
import { of } from 'rxjs';

describe('InfothekDetailPage', () => {
    let component: InfothekDetailPage;
    let fixture: ComponentFixture<InfothekDetailPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [InfothekDetailPage],
            imports: [IonicModule, RouterTestingModule.withRoutes([])],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { params: of({ index: '0' }) }
                },
                { provide: InfothekService, useClass: InfothekServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(InfothekDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
