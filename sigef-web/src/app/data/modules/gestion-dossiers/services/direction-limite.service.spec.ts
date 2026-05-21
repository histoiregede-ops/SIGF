import { TestBed } from '@angular/core/testing';

import { DirectionLimiteService } from './direction-limite.service';

describe('DirectionLimiteService', () => {
  let service: DirectionLimiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectionLimiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
