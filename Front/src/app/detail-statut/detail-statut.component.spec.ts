import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStatutComponent } from './detail-statut.component';

describe('DetailStatutComponent', () => {
  let component: DetailStatutComponent;
  let fixture: ComponentFixture<DetailStatutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailStatutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
