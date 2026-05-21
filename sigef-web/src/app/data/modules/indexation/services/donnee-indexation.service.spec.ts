import { TestBed } from '@angular/core/testing';

import { DonneeIndexationService } from './donnee-indexation.service';

describe('DonneeIndexationService', () => {
  let service: DonneeIndexationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonneeIndexationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
