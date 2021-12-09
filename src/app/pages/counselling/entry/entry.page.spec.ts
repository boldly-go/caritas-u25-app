import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntryPage } from './entry.page';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterService } from 'src/app/services/register.service';
import { RegisterServiceMock } from 'src/app/mocks/RegisterServiceMock';

describe('EntryPage', () => {
    let component: EntryPage;
    let fixture: ComponentFixture<EntryPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EntryPage],
            imports: [IonicModule, RouterTestingModule.withRoutes([])],
            providers: [{ provide: RegisterService, useClass: RegisterServiceMock }]
        }).compileComponents();

        fixture = TestBed.createComponent(EntryPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
