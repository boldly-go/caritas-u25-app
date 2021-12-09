import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PinCreateFormComponent } from './pin-create-form.component';
import { FormsModule } from '@angular/forms';
import { U25DirectivesModule } from '../../../directives/u25-directives.module';

describe('CreateFormComponent', () => {
    let component: PinCreateFormComponent;
    let fixture: ComponentFixture<PinCreateFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PinCreateFormComponent],
            imports: [IonicModule, FormsModule, U25DirectivesModule]
        }).compileComponents();

        fixture = TestBed.createComponent(PinCreateFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
