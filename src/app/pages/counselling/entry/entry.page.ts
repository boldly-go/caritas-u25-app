import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
    selector: 'u25-entry',
    templateUrl: './entry.page.html',
    styleUrls: ['./entry.page.scss']
})
export class EntryPage implements OnInit {
    isCounselorAvailable = false;

    constructor(private regService: RegisterService) {}

    ngOnInit() {
        this.regService.getRegisterStatus().subscribe((res) => {
            this.isCounselorAvailable = res;
        });
    }
}
