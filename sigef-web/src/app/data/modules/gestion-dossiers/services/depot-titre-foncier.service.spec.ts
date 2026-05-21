import { TestBed } from '@angular/core/testing';

import { DepotTitreFoncierService } from './depot-titre-foncier.service';

describe('DepotTitreFoncierService', () => {
  let service: DepotTitreFoncierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepotTitreFoncierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
