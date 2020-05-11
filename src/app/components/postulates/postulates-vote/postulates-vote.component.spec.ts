import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulatesVoteComponent } from './postulates-vote.component';

describe('PostulatesVoteComponent', () => {
  let component: PostulatesVoteComponent;
  let fixture: ComponentFixture<PostulatesVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulatesVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulatesVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
