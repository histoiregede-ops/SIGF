import { TestBed } from '@angular/core/testing';

import { TypeRegistreService } from './type-registre.service';

describe('TypeRegistreService', () => {
  let service: TypeRegistreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeRegistreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
