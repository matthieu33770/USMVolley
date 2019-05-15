import { TestBed } from '@angular/core/testing';

import { DisponibiliteService } from './disponibilite.service';

describe('DisponibiliteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisponibiliteService = TestBed.get(DisponibiliteService);
    expect(service).toBeTruthy();
  });
});
