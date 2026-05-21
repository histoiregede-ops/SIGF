import { TestBed } from '@angular/core/testing';

import { PieceIdentiteService } from './piece-identite.service';

describe('PieceIdentiteService', () => {
  let service: PieceIdentiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieceIdentiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
