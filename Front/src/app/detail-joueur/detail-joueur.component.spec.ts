import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailJoueurComponent } from './detail-joueur.component';

describe('DetailJoueurComponent', () => {
  let component: DetailJoueurComponent;
  let fixture: ComponentFixture<DetailJoueurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailJoueurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
