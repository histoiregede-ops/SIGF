import { TestBed } from '@angular/core/testing';

import { TacheIndexationService } from './tache-indexation.service';

describe('TacheIndexationService', () => {
  let service: TacheIndexationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TacheIndexationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
