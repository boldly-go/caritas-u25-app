import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IAppSecurity } from '../../../models/app-security';

@Component({
    selector: 'u25-pin-create-form',
    templateUrl: './pin-create-form.component.html',
    styleUrls: ['./pin-create-form.component.scss']
})
export class PinCreateFormComponent implements OnInit {
    @ViewChild('pinCreateForm') public form: NgForm;
    @Output() public ngSubmit: EventEmitter<any> = new EventEmitter<any>();

    public appSecurity: IAppSecurity = {
        pin: null,
        pinCheck: null,
        securityQuestion: null,
        securityResponse: null
    };
    public securityQuestions: string[] = [];

    constructor() {}

    ngOnInit() {
        this.securityQuestions = ['Lieblingstier', 'Lieblingsbuch', 'Erste Schule', 'Lieblingssport'];
    }
}
