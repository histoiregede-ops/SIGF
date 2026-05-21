import { TestBed } from '@angular/core/testing';

import { TypeOperationPostImmatriculationService } from './type-operation-post-immatriculation.service';

describe('TypeOperationPostImmatriculationService', () => {
  let service: TypeOperationPostImmatriculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOperationPostImmatriculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
