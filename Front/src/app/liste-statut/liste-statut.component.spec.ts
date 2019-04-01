import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeStatutComponent } from './liste-statut.component';

describe('ListeStatutComponent', () => {
  let component: ListeStatutComponent;
  let fixture: ComponentFixture<ListeStatutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeStatutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
