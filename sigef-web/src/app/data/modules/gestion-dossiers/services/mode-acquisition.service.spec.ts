import { TestBed } from '@angular/core/testing';

import { ModeAcquisitionService } from './mode-acquisition.service';

describe('ModeAcquisitionService', () => {
  let service: ModeAcquisitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeAcquisitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
