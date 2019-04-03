import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLieuxComponent } from './liste-lieux.component';

describe('ListeLieuxComponent', () => {
  let component: ListeLieuxComponent;
  let fixture: ComponentFixture<ListeLieuxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeLieuxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeLieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
