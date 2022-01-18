import { Component, ViewEncapsulation } from '@angular/core';
import { InfothekService } from 'src/app/services/infothek.service';
import { ActivatedRoute } from '@angular/router';
import { InfothekItem } from 'src/app/models/infothek-item';

@Component({
    selector: 'u25-infothek-detail',
    templateUrl: './infothek-detail.page.html',
    styleUrls: ['./infothek-detail.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InfothekDetailPage {
    infothekItem: InfothekItem;
    itemIndex = undefined;
    selectedSegment: string;
    constructor(private infothekService: InfothekService, private route: ActivatedRoute) {
        this.route.params.subscribe((params) => {
            this.itemIndex = params.index;
            if (this.itemIndex) {
                this.infothekItem = this.infothekService.getInfothekItemByIndex(this.itemIndex);
                this.selectedSegment = this.infothekItem.segments[0];
            }
        });
    }

    selectSegment(segment: string) {
        this.selectedSegment = segment;
    }
}
