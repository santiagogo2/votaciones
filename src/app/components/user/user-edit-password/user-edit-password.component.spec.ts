import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditPasswordComponent } from './user-edit-password.component';

describe('UserEditPasswordComponent', () => {
  let component: UserEditPasswordComponent;
  let fixture: ComponentFixture<UserEditPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
