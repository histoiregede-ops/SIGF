import { TestBed } from '@angular/core/testing';

import { PersonneDisposantService } from './personne-disposant.service';

describe('PersonneDisposantService', () => {
  let service: PersonneDisposantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonneDisposantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
