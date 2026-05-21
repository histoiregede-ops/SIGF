import { TestBed } from '@angular/core/testing';

import { CauseIndisponibiliteService } from './cause-indisponibilite.service';

describe('CauseIndisponibiliteService', () => {
  let service: CauseIndisponibiliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CauseIndisponibiliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
