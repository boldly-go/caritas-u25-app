import { TestBed } from '@angular/core/testing';

import { PushService } from './push.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './user.service';

describe('PushService', () => {
    let service: PushService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: UserService, useValue: {} }],
            imports: [RouterTestingModule]
        });
        service = TestBed.inject(PushService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
