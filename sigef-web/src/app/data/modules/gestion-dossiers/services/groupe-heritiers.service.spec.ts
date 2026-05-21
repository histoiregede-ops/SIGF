import { TestBed } from '@angular/core/testing';

import { GroupeHeritiersService } from './groupe-heritiers.service';

describe('GroupeHeritiersService', () => {
  let service: GroupeHeritiersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupeHeritiersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
