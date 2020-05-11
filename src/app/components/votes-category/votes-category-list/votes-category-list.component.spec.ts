import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesCategoryListComponent } from './votes-category-list.component';

describe('VotesCategoryListComponent', () => {
  let component: VotesCategoryListComponent;
  let fixture: ComponentFixture<VotesCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
