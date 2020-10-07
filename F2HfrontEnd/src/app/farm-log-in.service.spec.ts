import { TestBed } from '@angular/core/testing';

import { FarmLogInService } from './farm-log-in.service';

describe('FarmLogInService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FarmLogInService = TestBed.get(FarmLogInService);
    expect(service).toBeTruthy();
  });
});
