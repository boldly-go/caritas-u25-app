import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CounsellingIntroductionPage } from './counselling-introduction-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { InfoSlideComponent } from '../../../components/info-slide/info-slide.component';

describe('IntroductionPage', () => {
    let component: CounsellingIntroductionPage;
    let fixture: ComponentFixture<CounsellingIntroductionPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CounsellingIntroductionPage, InfoSlideComponent],
            imports: [IonicModule, RouterTestingModule.withRoutes([])]
        }).compileComponents();

        fixture = TestBed.createComponent(CounsellingIntroductionPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
