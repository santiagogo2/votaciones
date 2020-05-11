import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMassiveComponent } from './user-massive.component';

describe('UserMassiveComponent', () => {
  let component: UserMassiveComponent;
  let fixture: ComponentFixture<UserMassiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMassiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
