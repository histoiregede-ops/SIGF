import { TestBed } from '@angular/core/testing';

import { GroupeConjointsService } from './groupe-conjoints.service';

describe('GroupeConjointsService', () => {
  let service: GroupeConjointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupeConjointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
