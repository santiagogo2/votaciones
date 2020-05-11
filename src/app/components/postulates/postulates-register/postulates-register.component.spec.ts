import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulatesRegisterComponent } from './postulates-register.component';

describe('PostulatesRegisterComponent', () => {
  let component: PostulatesRegisterComponent;
  let fixture: ComponentFixture<PostulatesRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulatesRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulatesRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
