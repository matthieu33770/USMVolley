import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailManifestationComponent } from './detail-manifestation.component';

describe('DetailManifestationComponent', () => {
  let component: DetailManifestationComponent;
  let fixture: ComponentFixture<DetailManifestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailManifestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailManifestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
