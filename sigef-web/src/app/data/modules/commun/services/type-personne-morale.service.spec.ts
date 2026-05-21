import { TestBed } from '@angular/core/testing';

import { TypePersonneMoraleService } from './type-personne-morale.service';

describe('TypePersonneMoraleService', () => {
  let service: TypePersonneMoraleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypePersonneMoraleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
