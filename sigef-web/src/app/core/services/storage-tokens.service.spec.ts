import { TestBed } from '@angular/core/testing';

import { StorageTokensService } from './storage-tokens.service';

describe('StorageTokensService', () => {
  let service: StorageTokensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageTokensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
