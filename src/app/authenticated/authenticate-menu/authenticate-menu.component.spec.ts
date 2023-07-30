import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateMenuComponent } from './authenticate-menu.component';

describe('AuthenticateMenuComponent', () => {
  let component: AuthenticateMenuComponent;
  let fixture: ComponentFixture<AuthenticateMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticateMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
