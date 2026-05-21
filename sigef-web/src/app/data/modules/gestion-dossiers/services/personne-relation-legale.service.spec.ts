import { TestBed } from '@angular/core/testing';

import { PersonneRelationLegaleService } from './personne-relation-legale.service';

describe('PersonneRelationLegaleService', () => {
  let service: PersonneRelationLegaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonneRelationLegaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
