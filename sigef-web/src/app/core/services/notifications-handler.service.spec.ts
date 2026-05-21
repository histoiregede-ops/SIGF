import { TestBed } from '@angular/core/testing';

import { NotificationsHandlerService } from './notifications-handler.service';

describe('NotificationsHandlerService', () => {
  let service: NotificationsHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
