import { TestBed } from '@angular/core/testing';

import { LieuxService } from './lieux.service';

describe('LieuxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LieuxService = TestBed.get(LieuxService);
    expect(service).toBeTruthy();
  });
});
