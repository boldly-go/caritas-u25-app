import { Component, OnInit, ViewChild } from '@angular/core';
import { DiaryEntry } from 'src/app/models/diary-entry';
import { NgForm } from '@angular/forms';
import { DiaryService } from 'src/app/services/diary.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'u25-add-entry',
    templateUrl: './add-entry.page.html',
    styleUrls: ['./add-entry.page.scss']
})
export class AddEntryPage implements OnInit {
    @ViewChild('addDiaryEntryForm') addDiaryEntryForm: NgForm;

    emojis = ['∅', '😢', '😕', '😠', '😊', '😍', '😁', '🥱', '😑', '😫', '😉', '😅'];

    entry = new DiaryEntry();
    private leavePage$: Subject<boolean> = new Subject();
    constructor(
        private diaryService: DiaryService,
        private utilityService: UtilityService,
        private alertCtrl: AlertController,
        private router: Router
    ) {}

    selectEmoji(emoji) {
        this.entry.emoji = emoji;
    }

    canDeactivate() {
        if (!this.entry.content && !this.entry.emoji && !this.entry.title) {
            return true;
        } else {
            this.handleBackButton();
            return this.leavePage$;
        }
    }

    async handleBackButton() {
        if (this.entry.content || this.entry.emoji || this.entry.title) {
            const alert = await this.alertCtrl.create({
                message: 'Tagebucheintrag wird nicht gespeichert.',
                buttons: [
                    {
                        text: 'Okay',
                        handler: () => {
                            this.leavePage$.next(true);
                        }
                    },
                    {
                        text: 'Abbrechen',
                        handler: () => {
                            this.leavePage$.next(false);
                        }
                    }
                ]
            });
            await alert.present();
        }
    }

    saveEntry() {
        if (this.entry.title && this.entry.emoji && this.entry.date && this.entry.content) {
            this.diaryService.saveDiaryEntries(this.entry);
            this.entry = new DiaryEntry();
            this.router.navigate(['/diary']);
        } else {
            this.utilityService.showAlert('Fehler', 'Bitte Alle Felder ausfüllen und Emoji aussuchen');
        }
    }
    ngOnInit() {
        this.entry.date = new Date().getTime();
    }
}
