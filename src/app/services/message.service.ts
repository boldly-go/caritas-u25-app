import { Injectable } from '@angular/core';
import { combineLatest, Observable, of, Subject, forkJoin } from 'rxjs';
import { Message } from '../models/message';
import { DRAFT_MESSAGES, RC_TOKEN, RC_USER_ID } from '../storage-keys';
import { map, mergeMap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../../environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    rcTokenPromise = this.storageService.getDecryptedValue(RC_TOKEN);
    rcUidPromise = this.storageService.getDecryptedValue(RC_USER_ID);

    constructor(
        private storage: StorageService,
        private http: HttpClient,
        private storageService: StorageService,
        private oAuthService: OAuthService
    ) {}

    replaceUmlaute(text: string) {
        if (text) {
            return text
                .replace(/&auml;/g, 'ä')
                .replace(/&ouml;/g, 'ö')
                .replace(/&uuml;/g, 'ü')
                .replace(/&Auml;/g, 'Ä')
                .replace(/&Ouml;/g, 'Ö')
                .replace(/&Uuml;/g, 'Ü')
                .replace(/&szlig;/g, 'ß');
        }
    }

    public getRemoteMessages(): Observable<Message[]> {
        const sessionsUrl = baseUrl.userService + '/sessions/askers';
        const messagesUrl = baseUrl.messages + '?rcGroupId=';
        const messages: Subject<any> = new Subject();

        forkJoin([this.rcTokenPromise, this.rcUidPromise])
            .pipe(
                mergeMap(([rcToken, rcUserId]) => {
                    const httpOptions = {
                        headers: new HttpHeaders({
                            Authorization: 'Bearer ' + this.oAuthService.getAccessToken(),
                            'X-U25-APP-CSRF-TOKEN': 'asdafeqfeqq',
                            rcToken,
                            rcUserId
                        })
                    };
                    return of(httpOptions);
                })
            )
            .subscribe((httpOptions) => {
                this.http.get(sessionsUrl, httpOptions).subscribe(
                    (res: any) => {
                        const sessions = res.sessions;
                        sessions.forEach((element) => {
                            // groupId only exists after first message
                            const groupId = element.session.groupId;
                            if (groupId) {
                                this.http.get(messagesUrl + groupId, httpOptions).subscribe((messageArr: any) => {
                                    messageArr.messages.map((msg) => new Message(msg));
                                    messages.next(messageArr.messages.map((msg) => new Message(msg, groupId)));
                                });
                            } else {
                                messages.next([]);
                            }
                        });
                    },
                    (err) => {
                        console.log(err);
                        messages.next([]);
                    }
                );
            });
        return messages;
    }

    public sendMessage(message: Message): Subject<any> {
        const sessionsUrl = baseUrl.userService + '/sessions/askers';
        const sendMessageUrl = baseUrl.messages + '/new';
        const serverFeedbackSub = new Subject<{ success: boolean }>();
        forkJoin([this.rcTokenPromise, this.rcUidPromise])
            .pipe(
                mergeMap(([rcToken, rcUserId]) => {
                    return of({ rcToken, rcUserId });
                })
            )
            .subscribe(({ rcToken, rcUserId }) => {
                const sessionsHeader = {
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + this.oAuthService.getAccessToken(),
                        rcToken,
                        rcUserId,
                        'X-U25-APP-CSRF-TOKEN': 'asdafeqfeqq'
                    })
                };

                this.http.get(sessionsUrl, sessionsHeader).subscribe((res: any) => {
                    // groupId exists when enquiry was accepted
                    const groupId = res.sessions[0].session.groupId;
                    if (!groupId) {
                        this.sendInitialMessage(message, res.sessions[0].session.id, sessionsHeader, serverFeedbackSub);
                    } else {
                        const sendMessageHeader = { headers: sessionsHeader.headers.set('RCGroupId', groupId) };

                        const body = { message: message.text, sendNotification: true };
                        this.http.post(sendMessageUrl, body, sendMessageHeader).subscribe(
                            () => {
                                if (message.isDraft) {
                                    this.deleteDraftMesage(message);
                                }
                                serverFeedbackSub.next({ success: true });
                            },
                            () => {
                                serverFeedbackSub.next({ success: false });
                            }
                        );
                    }
                });
            });
        return serverFeedbackSub;
    }

    public getMessages(): Observable<Message[]> {
        const draftMessages = this.getDraftMessages();
        const rcMessages = this.getRemoteMessages();

        return combineLatest([rcMessages, draftMessages]).pipe(
            map((messages) => {
                const allMessages = messages.reduce((acc, val) => acc.concat(val), []);
                allMessages.reverse();
                return allMessages;
            })
        );
    }

    public getMessage(id: string): Observable<Message> {
        return new Observable<Message>((subscriber) => {
            this.getMessages().subscribe((messages) => {
                subscriber.next(this.filterMessage(id, messages));
                subscriber.complete();
            });
        });
    }

    messageReadStatus(groupId: string) {
        const url = baseUrl.rc + '/subscriptions.read';
        const body = { rid: groupId };
        forkJoin([this.rcTokenPromise, this.rcUidPromise])
            .pipe(
                mergeMap(([rcToken, rcUid]) => {
                    return of({ rcToken, rcUid });
                })
            )
            .subscribe((rcData) => {
                const messageReadHeader = {
                    headers: new HttpHeaders({ 'X-Auth-Token': rcData.rcToken, 'X-User-Id': rcData.rcUid })
                };

                this.http.post(url, body, messageReadHeader).subscribe(() => {});
            });
    }

    private async deleteDraftMesage(message: Message) {
        const draftMessages = await this.getDraftMessages();
        const i = draftMessages.findIndex((msg) => msg.id === message.id);
        if (i !== -1) {
            draftMessages.splice(i, 1);
        }
        await this.storage.storeEncryptedValue(DRAFT_MESSAGES, JSON.stringify(draftMessages));
    }

    public async saveDraftMessage(message: Message): Promise<void> {
        if (!message.text) {
            return;
        }
        const drafts: Message[] = await this.getDraftMessages();

        if (message.id === '') {
            message.id = 'draftMessage' + Math.floor(Math.random() * 1_000_000);
            drafts.push(message);
        } else {
            const draftIndex = drafts.findIndex((draft) => draft.id === message.id);
            drafts.splice(draftIndex, 1, message);
        }
        await this.storage.storeEncryptedValue(DRAFT_MESSAGES, JSON.stringify(drafts));
    }

    private async getDraftMessages(): Promise<Message[]> {
        const stringifiedMessages = await this.storage.getDecryptedValue(DRAFT_MESSAGES);
        return JSON.parse(stringifiedMessages) || [];
    }

    private filterMessage(id: string, messages: Message[]): Message {
        const index = messages.findIndex((msg) => msg.id === id);
        return index !== -1 ? messages[index] : null;
    }

    private sendInitialMessage(
        message: Message,
        sessionId: number,
        header: { headers: HttpHeaders },
        feedbackSub: Subject<any>
    ) {
        const body = { message: message.text, sendNotification: true };
        const messageUrl = baseUrl.userService + '/sessions/' + sessionId + '/enquiry/new';
        this.http.post(messageUrl, body, header).subscribe(
            () => {
                feedbackSub.next({ success: true });
                if (message.isDraft) {
                    this.deleteDraftMesage(message);
                }
            },
            () => {
                feedbackSub.next({ success: false });
            }
        );
    }
}
