import { TestBed } from '@angular/core/testing';

import { TypeLienGroupeService } from './type-lien-groupe.service';

describe('TypeLienGroupeService', () => {
  let service: TypeLienGroupeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeLienGroupeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
