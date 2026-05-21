import { TestBed } from '@angular/core/testing';

import { DivisionEnLotService } from './division-en-lot.service';

describe('DivisionEnLotService', () => {
  let service: DivisionEnLotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivisionEnLotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
