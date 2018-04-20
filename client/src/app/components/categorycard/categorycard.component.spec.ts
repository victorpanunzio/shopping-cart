import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorycardComponent } from './categorycard.component';

describe('CategorycardComponent', () => {
  let component: CategorycardComponent;
  let fixture: ComponentFixture<CategorycardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorycardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
