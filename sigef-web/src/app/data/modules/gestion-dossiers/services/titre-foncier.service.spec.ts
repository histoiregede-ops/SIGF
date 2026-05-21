import { TestBed } from '@angular/core/testing';

import { TitreFoncierService } from './titre-foncier.service';

describe('TitreFoncierService', () => {
  let service: TitreFoncierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitreFoncierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
