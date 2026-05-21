import { TestBed } from '@angular/core/testing';

import { RepresentantPersonnePhysiqueService } from './representant-personne-physique.service';

describe('RepresentantPersonnePhysiqueService', () => {
  let service: RepresentantPersonnePhysiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepresentantPersonnePhysiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
