import { TestBed } from '@angular/core/testing';

import { TypeDepotService } from './type-depot.service';

describe('TypeDepotService', () => {
  let service: TypeDepotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDepotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
