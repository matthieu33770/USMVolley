import { TestBed } from '@angular/core/testing';

import { CreneauxService } from './creneaux.service';

describe('CreneauxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreneauxService = TestBed.get(CreneauxService);
    expect(service).toBeTruthy();
  });
});
