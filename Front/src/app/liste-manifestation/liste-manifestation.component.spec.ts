import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeManifestationComponent } from './liste-manifestation.component';

describe('ListeManifestationComponent', () => {
  let component: ListeManifestationComponent;
  let fixture: ComponentFixture<ListeManifestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeManifestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeManifestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
