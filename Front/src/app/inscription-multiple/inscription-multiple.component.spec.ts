import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionMultipleComponent } from './inscription-multiple.component';

describe('InscriptionMultipleComponent', () => {
  let component: InscriptionMultipleComponent;
  let fixture: ComponentFixture<InscriptionMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscriptionMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
