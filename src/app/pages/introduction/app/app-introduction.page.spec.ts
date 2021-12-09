import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppIntroductionPage } from './app-introduction.page';
import { InfoSlideComponent } from '../../../components/info-slide/info-slide.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppIntroductionPage', () => {
    let component: AppIntroductionPage;
    let fixture: ComponentFixture<AppIntroductionPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppIntroductionPage, InfoSlideComponent],
            imports: [IonicModule, RouterTestingModule.withRoutes([])]
        }).compileComponents();

        fixture = TestBed.createComponent(AppIntroductionPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
