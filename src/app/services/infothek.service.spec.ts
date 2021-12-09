import { TestBed } from '@angular/core/testing';

import { InfothekService } from './infothek.service';

describe('InfothekService', () => {
  let service: InfothekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfothekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
