import { TestBed } from '@angular/core/testing';

import { PersonneConjointeService } from './personne-conjointe.service';

describe('PersonneConjointeService', () => {
  let service: PersonneConjointeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonneConjointeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
