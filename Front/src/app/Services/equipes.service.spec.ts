import { TestBed } from '@angular/core/testing';

import { EquipesService } from './equipes.service';

describe('EquipesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquipesService = TestBed.get(EquipesService);
    expect(service).toBeTruthy();
  });
});
