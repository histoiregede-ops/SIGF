import { TestBed } from '@angular/core/testing';

import { DossierRegistreService } from './dossier-registre.service';

describe('DossierRegistreService', () => {
  let service: DossierRegistreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DossierRegistreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
