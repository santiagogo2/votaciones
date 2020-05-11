import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesCategoryResultsComponent } from './votes-category-results.component';

describe('VotesCategoryResultsComponent', () => {
  let component: VotesCategoryResultsComponent;
  let fixture: ComponentFixture<VotesCategoryResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesCategoryResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesCategoryResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
