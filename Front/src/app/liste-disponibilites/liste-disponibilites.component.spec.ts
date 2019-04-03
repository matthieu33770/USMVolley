import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDisponibilitesComponent } from './liste-disponibilites.component';

describe('ListeDisponibilitesComponent', () => {
  let component: ListeDisponibilitesComponent;
  let fixture: ComponentFixture<ListeDisponibilitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDisponibilitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDisponibilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
