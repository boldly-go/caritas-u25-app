import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../../../models/message';
import { AlertController, Platform } from '@ionic/angular';
import { OnLeaveInput } from '../../../guards/save-input.guard';
import { Subject } from 'rxjs';
import { UtilityService } from 'src/app/services/utility.service';

import { StorageService } from 'src/app/services/storage.service';
import { RC_USER_ID } from '../../../storage-keys';
@Component({
    selector: 'u25-message',
    templateUrl: './message.page.html',
    styleUrls: ['./message.page.scss']
})
export class MessagePage implements OnInit, OnLeaveInput {
    public message: Message = new Message();
    public isEditable = false;
    public isIOS = false;
    private leavePage$: Subject<boolean> = new Subject();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private msgService: MessageService,
        private alertCtrl: AlertController,
        private platform: Platform,
        private utilityService: UtilityService,
        private storage: StorageService
    ) {
        this.isIOS = this.platform.is('ios');
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.initView(params.mode, params.id);
        });
    }

    canDeactivate() {
        if (!this.isEditable || !this.message.text) {
            return true;
        } else {
            this.handleBackButton();
            return this.leavePage$;
        }
    }

    public async handleBackButton() {
        if (this.isEditable && this.message.text) {
            const alert = await this.alertCtrl.create({
                message: 'Willst du deine Nachricht als Entwurf speichern?',
                buttons: [
                    {
                        text: 'Ja',
                        handler: async () => {
                            this.message.ts = new Date().toISOString();
                            this.message.authorId = await this.storage.getDecryptedValue(RC_USER_ID);
                            this.msgService.saveDraftMessage(this.message);
                            this.leavePage$.next(true);
                        }
                    },
                    {
                        text: 'Nein',
                        handler: () => {
                            this.leavePage$.next(true);
                        }
                    }
                ]
            });
            await alert.present();
        }
    }

    public onReplyMessage() {
        this.router.navigate(['/counselling/messages/edit']);
    }

    sendMessage(message) {
        this.msgService.sendMessage(message).subscribe((res) => {
            if (res.success) {
                this.message.text = undefined;
                this.router.navigateByUrl('/counselling/messages');
            } else {
                this.utilityService.showAlert('Fehler', 'Nachricht konnte nicht gesendet werden');
            }
        });
    }

    private initView(mode: string, msgId?: string) {
        this.isEditable = mode === 'edit';

        if (msgId) {
            this.msgService.getMessage(msgId).subscribe((msg) => {
                this.message = msg;
                this.message.text = this.msgService.replaceUmlaute(this.message.text);
            });
        }
    }
}
