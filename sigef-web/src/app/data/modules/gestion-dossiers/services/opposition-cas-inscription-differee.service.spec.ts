import { TestBed } from '@angular/core/testing';

import { OppositionCasInscriptionDiffereeService } from './opposition-cas-inscription-differee.service';

describe('OppositionCasInscriptionDiffereeService', () => {
  let service: OppositionCasInscriptionDiffereeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OppositionCasInscriptionDiffereeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
