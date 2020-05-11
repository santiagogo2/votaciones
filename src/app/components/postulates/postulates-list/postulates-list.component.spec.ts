import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulatesListComponent } from './postulates-list.component';

describe('PostulatesListComponent', () => {
  let component: PostulatesListComponent;
  let fixture: ComponentFixture<PostulatesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulatesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
