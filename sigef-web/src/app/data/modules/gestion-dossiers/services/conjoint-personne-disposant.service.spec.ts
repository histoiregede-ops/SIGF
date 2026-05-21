import { TestBed } from '@angular/core/testing';

import { ConjointPersonneDisposantService } from './conjoint-personne-disposant.service';

describe('ConjointPersonneDisposantService', () => {
  let service: ConjointPersonneDisposantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConjointPersonneDisposantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
