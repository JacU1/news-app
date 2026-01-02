import { TestBed } from '@angular/core/testing';

import { NotificationBoxService } from './notification-box.service';

describe('NotificationBoxService', () => {
  let service: NotificationBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
