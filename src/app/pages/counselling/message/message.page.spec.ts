import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagePage } from './message.page';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { OAuthServiceMock } from 'src/app/mocks/OAuthServiceMock';
import { MessageService } from 'src/app/services/message.service';
import { MessageServiceMock } from 'src/app/mocks/MessageServiceMock';

describe('MessagePage', () => {
    let component: MessagePage;
    let fixture: ComponentFixture<MessagePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessagePage],
            imports: [IonicModule, RouterTestingModule.withRoutes([]), FormsModule],
            providers: [
                { provide: ActivatedRoute, useValue: { params: of({ mode: 'edit' }) } },
                { provide: OAuthService, useClass: OAuthServiceMock },
                { provide: MessageService, useClass: MessageServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MessagePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
