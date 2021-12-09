import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
    selector: 'u25-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
    constructor(public authService: AuthService) {}
    filter: 'app-settings' | 'u25-settings' = 'app-settings';

    ngOnInit() {}

    public onFilterChanged(event?: any): void {
        this.filter = event.detail.value;
    }
}
