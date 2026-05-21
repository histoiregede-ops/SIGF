import { TestBed } from '@angular/core/testing';

import { DivisionEnVolumeService } from './division-en-volume.service';

describe('DivisionEnVolumeService', () => {
  let service: DivisionEnVolumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivisionEnVolumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
