import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionManifestationComponent } from './inscription-manifestation.component';

describe('InscriptionManifestationComponent', () => {
  let component: InscriptionManifestationComponent;
  let fixture: ComponentFixture<InscriptionManifestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscriptionManifestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionManifestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
