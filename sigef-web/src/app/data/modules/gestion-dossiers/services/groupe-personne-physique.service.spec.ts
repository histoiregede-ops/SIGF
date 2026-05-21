import { TestBed } from '@angular/core/testing';

import { GroupePersonnePhysiqueService } from './groupe-personne-physique.service';

describe('GroupePersonnePhysiqueService', () => {
  let service: GroupePersonnePhysiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupePersonnePhysiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
