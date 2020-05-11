import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulatesEditComponent } from './postulates-edit.component';

describe('PostulatesEditComponent', () => {
  let component: PostulatesEditComponent;
  let fixture: ComponentFixture<PostulatesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulatesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulatesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
