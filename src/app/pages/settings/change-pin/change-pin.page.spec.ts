import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { U25DirectivesModule } from '../../../directives/u25-directives.module';

import { ChangePinPage } from './change-pin.page';

describe('ChangePinPage', () => {
    let component: ChangePinPage;
    let fixture: ComponentFixture<ChangePinPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ChangePinPage],
            imports: [IonicModule, RouterTestingModule, FormsModule, U25DirectivesModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ChangePinPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
