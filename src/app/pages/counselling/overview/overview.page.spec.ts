import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OverviewPage } from './overview.page';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from '../../../services/message.service';
import { of } from 'rxjs';
import { MessageItemComponent } from './message-item/message-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OAuthService } from 'angular-oauth2-oidc';
import { OAuthServiceMock } from '../../../mocks/OAuthServiceMock';

import { AuthService } from 'src/app/services/auth.service';
import { AuthServiceMock } from '../../../mocks/AuthServiceMock';

describe('MessageOverviewPage', () => {
    let component: OverviewPage;
    let fixture: ComponentFixture<OverviewPage>;

    const msgStream = {
        messages: [
            {
                _id: 'M73fE4WhYF4peYB3s',
                rid: 'fR2Rz7dmWmHdXE8uz',
                msg:
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore iusto, tenetur? Accusantium autem, dolor doloribus ducimus et, in inventore labore modi nesciunt officiis pariatur placeat quod rerum ullam, veniam voluptates!',
                ts: '2018-11-15T09:33:00.057Z',
                u: {
                    _id: 'vppRFqjrzTsTZ6iEn',
                    username: 'test',
                    name: 'Mustermax'
                },
                unread: true,
                mentions: ['string'],
                channels: ['string'],
                _updatedAt: '2018-11-15T09:33:00.057Z'
            }
        ],
        count: 2,
        offset: 0,
        total: 2,
        success: true,
        cleaned: true
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [OverviewPage, MessageItemComponent],
            imports: [IonicModule, RouterTestingModule.withRoutes([]), HttpClientTestingModule],
            providers: [
                { provide: MessageService, useValue: { getMessages: () => of(msgStream) } },
                { provide: OAuthService, useClass: OAuthServiceMock },
                { provide: AuthService, useClass: AuthServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(OverviewPage);
        component = fixture.componentInstance;

        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
