import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiaryDetailPage } from './diary-detail.page';
import { RouterTestingModule } from '@angular/router/testing';
import { MockedEmojiPipe } from 'src/app/mocks/MockedEmojiPipe';

describe('DiaryDetailPage', () => {
    let component: DiaryDetailPage;
    let fixture: ComponentFixture<DiaryDetailPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DiaryDetailPage, MockedEmojiPipe],
            imports: [IonicModule.forRoot(), RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(DiaryDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
