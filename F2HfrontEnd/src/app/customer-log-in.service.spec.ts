import { TestBed } from '@angular/core/testing';

import { CustomerLogInService } from './customer-log-in.service';

describe('CustomerLogInService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerLogInService = TestBed.get(CustomerLogInService);
    expect(service).toBeTruthy();
  });
});
