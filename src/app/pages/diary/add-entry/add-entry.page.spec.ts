import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEntryPage } from './add-entry.page';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { MockedDatePipe } from '../../../mocks/MockedDatePipe';

describe('AddEntryPage', () => {
    let component: AddEntryPage;
    let fixture: ComponentFixture<AddEntryPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddEntryPage, MockedDatePipe],
            imports: [IonicModule, RouterTestingModule, FormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(AddEntryPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
