import { TestBed } from '@angular/core/testing';

import { ActeRegistreService } from './acte-registre.service';

describe('ActeRegistreService', () => {
  let service: ActeRegistreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActeRegistreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
