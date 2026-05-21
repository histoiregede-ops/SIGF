import { TestBed } from '@angular/core/testing';

import { PrivilegeHypothequeService } from './privilege-hypotheque.service';

describe('PrivilegeHypothequeService', () => {
  let service: PrivilegeHypothequeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivilegeHypothequeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
