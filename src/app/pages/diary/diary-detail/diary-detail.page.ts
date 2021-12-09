import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiaryEntry } from 'src/app/models/diary-entry';

@Component({
    selector: 'u25-diary-detail',
    templateUrl: './diary-detail.page.html',
    styleUrls: ['./diary-detail.page.scss']
})
export class DiaryDetailPage implements OnInit {
    diaryEntry: DiaryEntry;
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.queryParams.subscribe((val) => {
            this.diaryEntry = val as DiaryEntry;
        });
    }
}
