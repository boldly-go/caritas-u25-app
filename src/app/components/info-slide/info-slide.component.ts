import { Component, Input, OnInit } from '@angular/core';
import { ISlideContent } from '../../models/slider-content';

@Component({
    selector: 'u25-info-slide',
    templateUrl: './info-slide.component.html',
    styleUrls: ['./info-slide.component.scss']
})
export class InfoSlideComponent implements OnInit {
    @Input() public slide: ISlideContent;

    constructor() {}

    ngOnInit() {}
}
