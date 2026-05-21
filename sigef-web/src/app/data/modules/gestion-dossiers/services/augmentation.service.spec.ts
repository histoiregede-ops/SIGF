import { TestBed } from '@angular/core/testing';

import { AugmentationService } from './augmentation.service';

describe('AugmentationService', () => {
  let service: AugmentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AugmentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
