import { TestBed } from '@angular/core/testing';

import { PartiePrenanteService } from './partie-prenante.service';

describe('PartiePrenanteService', () => {
  let service: PartiePrenanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartiePrenanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
