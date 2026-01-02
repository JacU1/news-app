import { TestBed } from '@angular/core/testing';

import { CanLoadLoggedUserGuard } from './can-activate-logged-user.guard';

describe('CanActivateLoggedUserGuard', () => {
  let guard: CanLoadLoggedUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLoadLoggedUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
