import { TestBed } from '@angular/core/testing';

import { LimiteService } from './limite.service';

describe('LimiteService', () => {
  let service: LimiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LimiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
