import { TestBed } from '@angular/core/testing';

import { PersonneCibleService } from './personne-cible.service';

describe('PersonneCibleService', () => {
  let service: PersonneCibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonneCibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
