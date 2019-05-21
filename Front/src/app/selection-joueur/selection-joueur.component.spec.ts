import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionJoueurComponent } from './selection-joueur.component';

describe('SelectionJoueurComponent', () => {
  let component: SelectionJoueurComponent;
  let fixture: ComponentFixture<SelectionJoueurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionJoueurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
