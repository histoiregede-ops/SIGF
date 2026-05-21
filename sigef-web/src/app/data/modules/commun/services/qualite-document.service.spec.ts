import { TestBed } from '@angular/core/testing';

import { QualiteDocumentService } from './qualite-document.service';

describe('QualiteDocumentService', () => {
  let service: QualiteDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualiteDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
