import { TestBed } from '@angular/core/testing';

import { CentreConservationFonciereService } from './centre-conservation-fonciere.service';

describe('CentreConservationFonciereService', () => {
  let service: CentreConservationFonciereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentreConservationFonciereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
