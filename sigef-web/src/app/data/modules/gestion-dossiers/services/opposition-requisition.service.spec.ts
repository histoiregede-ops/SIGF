import { TestBed } from '@angular/core/testing';

import { OppositionRequisitionService } from './opposition-requisition.service';

describe('OppositionRequisitionService', () => {
  let service: OppositionRequisitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OppositionRequisitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
