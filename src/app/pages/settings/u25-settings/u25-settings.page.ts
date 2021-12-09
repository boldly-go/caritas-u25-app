import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

import { User } from '../../../models/user';

@Component({
    selector: 'u25-u25-settings',
    templateUrl: './u25-settings.page.html',
    styleUrls: ['./u25-settings.page.scss']
})
export class U25SettingsPage implements OnInit {
    user: User = {
        username: undefined,
        age: undefined,
        gender: undefined,
        state: undefined,
        helpdesk: undefined
    };

    constructor(private router: Router, private userService: UserService) {}

    ngOnInit() {
        this.userService.getUserData().subscribe((res) => {
            this.user = res;
        });
    }

    changePassword() {
        this.router.navigateByUrl('/settings/change-password');
    }
}
