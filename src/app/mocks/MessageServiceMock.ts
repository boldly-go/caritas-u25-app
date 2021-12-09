import { of, Subject } from 'rxjs';
import { Message } from '../models/message';
import { IMessageStream } from '../models/rocket-chat/message';

export class MessageServiceMock {
    getRemoteMessage() {
        const stream: IMessageStream = {
            messages: [
                {
                    _id: 'M73fE4WhYF4peYB3s',
                    rid: 'fR2Rz7dmWmHdXE8uz',
                    msg: 'Lorem ipsum dolor sit amet,',
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
                },
                {
                    _id: 'M73fE4WhefsdYF4peYB3s',
                    rid: 'fR2Rz7dmfdsfsWmHdXE8uz',
                    msg: 'Neue Testnachricht',
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

        return of(stream.messages.map((message) => new Message(message)));
    }
    sendMessage() {
        return new Subject();
    }
    replaceUmlaute(text: string) {
        return text;
    }
    getMessages() {
        return of(null);
    }
    getMessage(id: string) {
        return of(null);
    }
    saveDraftMessage(message: any) {
        return new Promise(null);
    }
    getDraftMessages() {
        return new Promise(null);
    }
    filterMessage(id: string, messages: any[]) {
        return null;
    }
}
