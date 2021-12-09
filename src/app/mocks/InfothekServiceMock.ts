import { InfothekItem } from '../models/infothek-item';

export class InfothekServiceMock {
    infothekItems: InfothekItem[] = [
        {
            title: 'Test title',
            showDetail: false,
            shortText: 'Test short text',
            segments: ['info', 'vorurteile'],
            content: {
                info: { title: 'Info', text: 'Info Text test' },
                vorurteile: { title: 'Vorurteile', text: 'Vorurteile Text test' }
            }
        }
    ];

    getAllInfothekItems(): InfothekItem[] {
        return this.infothekItems;
    }

    getInfothekItemByIndex(i: number): InfothekItem {
        return this.infothekItems[0];
    }
}
