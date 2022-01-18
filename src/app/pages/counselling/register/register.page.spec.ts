import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import { FormsModule } from '@angular/forms';
import { U25DirectivesModule } from '../../../directives/u25-directives.module';
import { RegisterService } from 'src/app/services/register.service';
import { RegisterServiceMock } from 'src/app/mocks/RegisterServiceMock';
import { U25PipesModule } from 'src/app/pipes/u25-pipes.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../../services/auth.service';
import { AuthServiceMock } from '../../../mocks/AuthServiceMock';
import { PushService } from '../../../services/push.service';
import { StorageService } from '../../../services/storage.service';

describe('RegisterPage', () => {
    let component: RegisterPage;
    let fixture: ComponentFixture<RegisterPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterPage],
            imports: [
                IonicModule,
                RouterTestingModule,
                HttpClientTestingModule,
                FormsModule,
                U25DirectivesModule,
                U25PipesModule
            ],
            providers: [
                { provide: RegisterService, useClass: RegisterServiceMock },
                { provide: AuthService, useClass: AuthServiceMock },
                { provide: PushService, useValue: null },
                { provide: StorageService, useValue: null }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(RegisterPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
