import { TestBed } from '@angular/core/testing';

import { RepresentantPersonneMoraleService } from './representant-personne-morale.service';

describe('RepresentantPersonneMoraleService', () => {
  let service: RepresentantPersonneMoraleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepresentantPersonneMoraleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
