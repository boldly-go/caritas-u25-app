import { Component, OnInit } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service';
import { DiaryEntry } from 'src/app/models/diary-entry';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'u25-diary-overview',
    templateUrl: './diary-overview.page.html',
    styleUrls: ['./diary-overview.page.scss']
})
export class DiaryOverviewPage implements OnInit {
    diaryEntries: DiaryEntry[] = [];
    public isIOS: boolean;

    constructor(private diaryService: DiaryService, private platform: Platform) {
        this.isIOS = this.platform.is('ios');
    }

    ngOnInit() {}

    ionViewWillEnter() {
        this.diaryService.getDiaryEntries().then((entries: DiaryEntry[]) => {
            entries.sort((a, b) => {
                return b.date - a.date;
            });
            this.diaryEntries = entries;
        });
    }
}
