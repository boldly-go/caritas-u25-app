import { Injectable } from '@angular/core';
import { infothek } from '../../assets/infothek';
import { InfothekItem } from '../models/infothek-item';
@Injectable({
    providedIn: 'root'
})
export class InfothekService {
    infothekItems: InfothekItem[];
    constructor() {
        this.infothekItems = infothek;
    }

    getAllInfothekItems(): InfothekItem[] {
        return this.infothekItems;
    }

    getInfothekItemByIndex(i: number): InfothekItem {
        return this.infothekItems[i];
    }
}
