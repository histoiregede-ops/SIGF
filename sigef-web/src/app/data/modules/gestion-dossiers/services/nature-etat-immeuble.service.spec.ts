import { TestBed } from '@angular/core/testing';

import { NatureEtatImmeubleService } from './nature-etat-immeuble.service';

describe('NatureEtatImmeubleService', () => {
  let service: NatureEtatImmeubleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureEtatImmeubleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
