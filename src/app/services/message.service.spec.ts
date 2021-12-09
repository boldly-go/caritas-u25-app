import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { Message } from '../models/message';
import { of } from 'rxjs';
import { StorageService } from './storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OAuthServiceMock } from '../mocks/OAuthServiceMock';
import { OAuthService } from 'angular-oauth2-oidc';

describe('MessageService', () => {
    let service: MessageService;
    let storageServiceSpy: StorageService;

    const message1 = new Message();
    message1.id = 'fR2Rz7dmWmHdXE8uz';
    message1.text =
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore iusto, tenetur? ' +
        'Accusantium autem, dolor doloribus ducimus et, in inventore labore modi nesciunt officiis pariatur placeat quod rerum ullam, veniam voluptates!';
    message1.counsellor = 'Mustermax';
    message1.ts = '2018-11-15T09:33:00.057Z';
    message1.isDraft = false;
    message1.authorId = 'fR2Rz7dmWm214E8uz';
    message1.unread = false;
    message1.groupId = 'anyGroupID';

    const message2 = {
        id: 'lokal5496524',
        text: 'Eine Entwurfnachricht',
        counsellor: '',
        ts: '2018-11-17T09:33:00.057Z',
        isDraft: true,
        authorId: 'fR2RffffWm214E8uz',
        unread: false,
        groupId: 'anyGroupID'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: OAuthService, useClass: OAuthServiceMock }]
        });
        service = TestBed.inject(MessageService);
        storageServiceSpy = TestBed.inject(StorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    /*     it('should return all messages', async (done) => {
        spyOn(storageServiceSpy, 'getDecryptedValue').and.resolveTo(JSON.stringify([message2]));

        service.getMessages().subscribe((messages) => {
            expect(messages).toEqual([message1, message2]);
            done();
        });
    }); */

    it('should return a certain message', (done) => {
        spyOn(storageServiceSpy, 'getDecryptedValue').and.resolveTo(JSON.stringify([message2]));
        spyOn(service, 'getMessages').and.returnValue(of([message1, message2]));

        service.getMessage('lokal5496524').subscribe((message) => {
            expect(message).toEqual(message2);
            done();
        });
    });
});
