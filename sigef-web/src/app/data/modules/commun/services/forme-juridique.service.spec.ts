import { TestBed } from '@angular/core/testing';

import { FormeJuridiqueService } from './forme-juridique.service';

describe('FormeJuridiqueService', () => {
  let service: FormeJuridiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormeJuridiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
