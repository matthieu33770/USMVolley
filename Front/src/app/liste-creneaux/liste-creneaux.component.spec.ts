import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCreneauxComponent } from './liste-creneaux.component';

describe('ListeCreneauxComponent', () => {
  let component: ListeCreneauxComponent;
  let fixture: ComponentFixture<ListeCreneauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeCreneauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCreneauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
