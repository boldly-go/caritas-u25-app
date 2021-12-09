import { IMessage } from './rocket-chat/message';

export class Message {
    id = '';
    ts: string;
    counsellor: string;
    text: string;
    isDraft = true;
    authorId = '';
    unread: boolean;
    groupId = '';

    constructor(rcMessage?: IMessage, groupId?: string) {
        if (rcMessage) {
            this.id = rcMessage._id;
            this.ts = rcMessage.ts;
            this.counsellor = rcMessage.u.name ? rcMessage.u.name : rcMessage.u.username;
            this.text = rcMessage.msg;
            this.isDraft = false;
            this.authorId = rcMessage.u._id;
            this.unread = rcMessage.unread;
            this.groupId = groupId;
        }
    }
}
