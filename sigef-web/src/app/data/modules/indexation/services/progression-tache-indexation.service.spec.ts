import { TestBed } from '@angular/core/testing';

import { ProgressionTacheIndexationService } from './progression-tache-indexation.service';

describe('ProgressionTacheIndexationService', () => {
  let service: ProgressionTacheIndexationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressionTacheIndexationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
