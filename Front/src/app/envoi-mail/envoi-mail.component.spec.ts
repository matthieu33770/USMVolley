import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoiMailComponent } from './envoi-mail.component';

describe('EnvoiMailComponent', () => {
  let component: EnvoiMailComponent;
  let fixture: ComponentFixture<EnvoiMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvoiMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoiMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
