import { TestBed } from '@angular/core/testing';

import { PieceDeposeeService } from './piece-deposee.service';

describe('PieceDeposeeService', () => {
  let service: PieceDeposeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieceDeposeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
