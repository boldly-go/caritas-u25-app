import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoSlideComponent } from './info-slide.component';

describe('InfoSlideshowComponent', () => {
    let component: InfoSlideComponent;
    let fixture: ComponentFixture<InfoSlideComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InfoSlideComponent],
            imports: [IonicModule]
        }).compileComponents();

        fixture = TestBed.createComponent(InfoSlideComponent);
        component = fixture.componentInstance;
        component.slide = { imgSrc: '', icon: '', title: '', subtitle: '', description: '' };

        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
