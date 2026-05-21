import { TestBed } from '@angular/core/testing';

import { PersonneHeritiereService } from './personne-heritiere.service';

describe('PersonneHeritiereService', () => {
  let service: PersonneHeritiereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonneHeritiereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
