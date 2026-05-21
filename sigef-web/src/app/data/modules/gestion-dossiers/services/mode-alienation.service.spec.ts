import { TestBed } from '@angular/core/testing';

import { ModeAlienationService } from './mode-alienation.service';

describe('ModeAlienationService', () => {
  let service: ModeAlienationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeAlienationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
