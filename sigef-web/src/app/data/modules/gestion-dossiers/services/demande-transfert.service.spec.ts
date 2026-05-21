import { TestBed } from '@angular/core/testing';

import { DemandeTransfertService } from './demande-transfert.service';

describe('DemandeTransfertService', () => {
  let service: DemandeTransfertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeTransfertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
