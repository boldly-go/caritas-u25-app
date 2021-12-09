import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Subscription } from 'rxjs';
import { Message } from '../../../models/message';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'u25-overview',
    templateUrl: './overview.page.html',
    styleUrls: ['./overview.page.scss']
})
export class OverviewPage implements OnInit, OnDestroy {
    public filter: 'sent' | 'received' | 'draft' = 'received';
    public isIOS: boolean;
    public receivedMessages: Message[];
    public sentMessages: Message[];
    public draftMessages: Message[];

    private messagesSub: Subscription;
    constructor(private router: Router, private msgService: MessageService, private platform: Platform) {
        this.isIOS = this.platform.is('ios');
    }

    ngOnInit() {}

    ionViewWillEnter() {
        this.messagesSub = this.msgService.getMessages().subscribe((messages) => {
            this.msgService.rcUidPromise.then((rcUid) => {
                this.receivedMessages = messages.filter(
                    (msg) => msg.authorId !== rcUid && !msg.isDraft && msg.text.trim() !== ''
                );
                this.sentMessages = messages.filter((msg) => msg.authorId === rcUid && !msg.isDraft);

                this.draftMessages = messages.filter((msg) => msg.isDraft);
            });
        });
    }

    messageRead(groupId: string) {
        this.msgService.messageReadStatus(groupId);
    }

    public onFilterChanged(event?: any): void {
        this.filter = event.detail.value;
    }

    public onNewMessage() {
        this.router.navigate(['/counselling/messages/edit']);
    }

    ngOnDestroy() {
        this.messagesSub?.unsubscribe();
    }
}
