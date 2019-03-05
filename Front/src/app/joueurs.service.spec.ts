import { TestBed } from '@angular/core/testing';

import { JoueursService } from './joueurs.service';

describe('JoueursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JoueursService = TestBed.get(JoueursService);
    expect(service).toBeTruthy();
  });
});
