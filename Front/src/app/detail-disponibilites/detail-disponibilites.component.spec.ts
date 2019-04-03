import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDisponibilitesComponent } from './detail-disponibilites.component';

describe('DetailDisponibilitesComponent', () => {
  let component: DetailDisponibilitesComponent;
  let fixture: ComponentFixture<DetailDisponibilitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDisponibilitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDisponibilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
