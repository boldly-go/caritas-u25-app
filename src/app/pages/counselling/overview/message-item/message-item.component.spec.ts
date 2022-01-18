import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessageItemComponent } from './message-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageServiceMock } from 'src/app/mocks/MessageServiceMock';
import { MessageService } from 'src/app/services/message.service';

describe('MessageItemComponent', () => {
    let component: MessageItemComponent;
    let fixture: ComponentFixture<MessageItemComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MessageItemComponent],
            imports: [IonicModule, RouterTestingModule.withRoutes([])],
            providers: [{ provide: MessageService, useClass: MessageServiceMock }]
        }).compileComponents();

        fixture = TestBed.createComponent(MessageItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
