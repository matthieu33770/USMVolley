import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoyerMailComponent } from './envoyer-mail.component';

describe('EnvoyerMailComponent', () => {
  let component: EnvoyerMailComponent;
  let fixture: ComponentFixture<EnvoyerMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvoyerMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoyerMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
