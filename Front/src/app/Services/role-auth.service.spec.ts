import { TestBed } from '@angular/core/testing';

import { RoleAuthService } from './role-auth.service';

describe('RoleAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleAuthService = TestBed.get(RoleAuthService);
    expect(service).toBeTruthy();
  });
});
