import { TestBed } from '@angular/core/testing';

import { OppositionService } from './opposition.service';

describe('OppositionService', () => {
  let service: OppositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OppositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
