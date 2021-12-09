import { IUser } from './user';
import { IFile } from './file';
import { IAttachment } from './attachment';

export interface IMessageStream {
    messages: IMessage[];
    count: number;
    offset: number;
    total: number;
    success: boolean;
    cleaned: boolean;
}

export interface IMessage {
    _id: string;
    rid: string;
    msg: string;
    ts: string;
    u: IUser;
    unread: boolean;
    mentions: string[];
    channels: string[];
    _updatedAt: string;
    attachments?: IAttachment[];
    file?: IFile;
}
