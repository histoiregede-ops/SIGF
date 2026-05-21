import { TestBed } from '@angular/core/testing';

import { IndexeurService } from './indexeur.service';

describe('IndexeurService', () => {
  let service: IndexeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
