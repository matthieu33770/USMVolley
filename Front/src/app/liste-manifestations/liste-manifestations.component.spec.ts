import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeManifestationsComponent } from './liste-manifestations.component';

describe('ListeManifestationsComponent', () => {
  let component: ListeManifestationsComponent;
  let fixture: ComponentFixture<ListeManifestationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeManifestationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeManifestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
