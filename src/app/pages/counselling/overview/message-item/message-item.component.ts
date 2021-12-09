import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../../models/message';
import { StorageService } from 'src/app/services/storage.service';
import { RC_USER_ID } from '../../../../storage-keys';
import { MessageService } from 'src/app/services/message.service';
@Component({
    selector: 'u25-message-item',
    templateUrl: './message-item.component.html',
    styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {
    @Input() message: Message = new Message();
    @Input() canEdit = true;
    unread = false;
    public route: string;

    constructor(private storage: StorageService, public msgService: MessageService) {}

    ngOnInit() {
        this.storage.getDecryptedValue(RC_USER_ID).then((val) => {
            this.unread = this.message.unread && this.message.authorId !== val;
        });
        if (this.canEdit && this.message.id !== '') {
            this.route = 'edit/' + this.message.id;
        } else if (!this.canEdit && this.message.id !== '') {
            this.route = 'read/' + this.message.id;
        } else {
            this.route = 'edit';
        }
    }
}
