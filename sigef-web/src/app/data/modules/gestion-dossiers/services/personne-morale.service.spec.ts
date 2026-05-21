import { TestBed } from '@angular/core/testing';

import { PersonneMoraleService } from './personne-morale.service';

describe('PersonneMoraleService', () => {
  let service: PersonneMoraleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonneMoraleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
