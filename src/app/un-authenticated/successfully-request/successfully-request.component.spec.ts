import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullyRequestComponent } from './successfully-request.component';

describe('SuccessfullyRequestComponent', () => {
  let component: SuccessfullyRequestComponent;
  let fixture: ComponentFixture<SuccessfullyRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfullyRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfullyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
