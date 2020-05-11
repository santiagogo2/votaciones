import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesCategoryRegisterComponent } from './votes-category-register.component';

describe('VotesCategoryRegisterComponent', () => {
  let component: VotesCategoryRegisterComponent;
  let fixture: ComponentFixture<VotesCategoryRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesCategoryRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesCategoryRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
