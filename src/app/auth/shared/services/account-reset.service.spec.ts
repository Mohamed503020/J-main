import { TestBed } from '@angular/core/testing';

import { AccountResetService } from './account-reset.service';

describe('AccountResetService', () => {
  let service: AccountResetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountResetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
