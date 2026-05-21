import { TestBed } from '@angular/core/testing';

import { DemandeEtatDescriptifService } from './demande-etat-descriptif.service';

describe('DemandeEtatDescriptifService', () => {
  let service: DemandeEtatDescriptifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeEtatDescriptifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
