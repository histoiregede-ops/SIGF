import { TestBed } from '@angular/core/testing';

import { NatureTypeImmeubleService } from './nature-type-immeuble.service';

describe('NatureTypeImmeubleService', () => {
  let service: NatureTypeImmeubleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureTypeImmeubleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
