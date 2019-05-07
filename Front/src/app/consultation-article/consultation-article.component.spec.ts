import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationArticleComponent } from './consultation-article.component';

describe('ConsultationArticleComponent', () => {
  let component: ConsultationArticleComponent;
  let fixture: ComponentFixture<ConsultationArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
