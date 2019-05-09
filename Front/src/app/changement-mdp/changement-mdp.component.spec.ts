import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangementMdpComponent } from './changement-mdp.component';

describe('ChangementMdpComponent', () => {
  let component: ChangementMdpComponent;
  let fixture: ComponentFixture<ChangementMdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangementMdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangementMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
