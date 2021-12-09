import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { DIARY_ENTRIES } from '../storage-keys';
import { DiaryEntry } from '../models/diary-entry';

@Injectable({
    providedIn: 'root'
})
export class DiaryService {
    diaryEntries: DiaryEntry[];
    constructor(private storage: StorageService) {}

    saveDiaryEntries(entry: DiaryEntry) {
        this.getDiaryEntries().then(() => {
            entry.id = 'diaryEntry' + Math.floor(Math.random() * 1_000_000);
            this.diaryEntries.push(entry);
            this.storage.storeEncryptedValue(DIARY_ENTRIES, JSON.stringify(this.diaryEntries));
        });
    }

    async getDiaryEntries(): Promise<DiaryEntry[]> {
        if (!this.diaryEntries) {
            const stringifiedMessages = await this.storage.getDecryptedValue(DIARY_ENTRIES);
            this.diaryEntries = JSON.parse(stringifiedMessages) || [];
        }
        return this.diaryEntries;
    }
}
