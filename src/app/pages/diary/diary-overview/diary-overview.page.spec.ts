import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiaryOverviewPage } from './diary-overview.page';
import { RouterTestingModule } from '@angular/router/testing';
import { U25PipesModule } from 'src/app/pipes/u25-pipes.module';

describe('DiaryOverviewPage', () => {
    let component: DiaryOverviewPage;
    let fixture: ComponentFixture<DiaryOverviewPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DiaryOverviewPage],
            imports: [IonicModule, RouterTestingModule, U25PipesModule]
        }).compileComponents();

        fixture = TestBed.createComponent(DiaryOverviewPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
