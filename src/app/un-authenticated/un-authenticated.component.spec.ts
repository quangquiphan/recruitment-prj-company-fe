import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthenticatedComponent } from './un-authenticated.component';

describe('UnAuthenticatedComponent', () => {
  let component: UnAuthenticatedComponent;
  let fixture: ComponentFixture<UnAuthenticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnAuthenticatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnAuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
