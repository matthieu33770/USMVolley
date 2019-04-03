import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCreneauxComponent } from './detail-creneaux.component';

describe('DetailCreneauxComponent', () => {
  let component: DetailCreneauxComponent;
  let fixture: ComponentFixture<DetailCreneauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCreneauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCreneauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
