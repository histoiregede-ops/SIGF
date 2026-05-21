import { TestBed } from '@angular/core/testing';

import { DroitReelConstitueParDenombrementService } from './droit-reel-constitue-par-denombrement.service';

describe('DroitReelConstitueParDenombrementService', () => {
  let service: DroitReelConstitueParDenombrementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DroitReelConstitueParDenombrementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
