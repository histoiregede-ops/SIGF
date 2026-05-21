import { TestBed } from '@angular/core/testing';

import { ControleurService } from './controleur.service';

describe('ControleurService', () => {
  let service: ControleurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControleurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
