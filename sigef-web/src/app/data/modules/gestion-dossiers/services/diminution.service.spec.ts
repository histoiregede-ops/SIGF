import { TestBed } from '@angular/core/testing';

import { DiminutionService } from './diminution.service';

describe('DiminutionService', () => {
  let service: DiminutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiminutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
