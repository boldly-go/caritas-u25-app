import { Component, OnInit } from '@angular/core';
import { InfothekService } from 'src/app/services/infothek.service';
import { Router } from '@angular/router';
import { InfothekItem } from 'src/app/models/infothek-item';
@Component({
    selector: 'u25-infothek',
    templateUrl: './infothek.page.html',
    styleUrls: ['./infothek.page.scss']
})
export class InfothekPage implements OnInit {
    infothekItems: InfothekItem[];
    constructor(private infothekService: InfothekService, private router: Router) {
        this.infothekItems = this.infothekService.getAllInfothekItems();
    }

    navigateTo(i) {
        this.router.navigateByUrl('info-desk/detail/' + i);
    }

    toggleShowDetail(showDetail) {
        return (showDetail = !showDetail);
    }
    lineString(showDetail) {
        if (showDetail) {
            return 'none';
        } else {
            return 'full';
        }
    }
    ngOnInit() {}
}
