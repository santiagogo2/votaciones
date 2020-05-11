import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesCategoryEditComponent } from './votes-category-edit.component';

describe('VotesCategoryEditComponent', () => {
  let component: VotesCategoryEditComponent;
  let fixture: ComponentFixture<VotesCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
