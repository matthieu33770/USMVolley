import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCategorieComponent } from './detail-categorie.component';

describe('DetailCategorieComponent', () => {
  let component: DetailCategorieComponent;
  let fixture: ComponentFixture<DetailCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
