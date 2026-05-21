import { TestBed } from '@angular/core/testing';

import { SituationFiscaleService } from './situation-fiscale.service';

describe('SituationFiscaleService', () => {
  let service: SituationFiscaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SituationFiscaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
