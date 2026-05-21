import { TestBed } from '@angular/core/testing';

import { TypeRelationLegaleService } from './type-relation-legale.service';

describe('TypeRelationLegaleService', () => {
  let service: TypeRelationLegaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeRelationLegaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
