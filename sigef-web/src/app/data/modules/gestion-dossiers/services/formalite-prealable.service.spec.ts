import { TestBed } from '@angular/core/testing';

import { FormalitePrealableService } from './formalite-prealable.service';

describe('FormalitePrealableService', () => {
  let service: FormalitePrealableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormalitePrealableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
