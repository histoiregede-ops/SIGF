import { TestBed } from '@angular/core/testing';

import { PersonneMembreService } from './personne-membre.service';

describe('PersonneMembreService', () => {
  let service: PersonneMembreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonneMembreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
