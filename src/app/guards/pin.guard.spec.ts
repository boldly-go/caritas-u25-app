import { TestBed } from '@angular/core/testing';

import { PinGuard } from './pin.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { LockService } from '../services/lock.service';
import { LockServiceMock } from '../mocks/LockServiceMock';

describe('PinGuard', () => {
    let guard: PinGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])],
            providers: [{ provide: LockService, useClass: LockServiceMock }]
        });
        guard = TestBed.inject(PinGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
