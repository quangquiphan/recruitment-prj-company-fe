import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobInforComponent } from './job-infor.component';

describe('JobInforComponent', () => {
  let component: JobInforComponent;
  let fixture: ComponentFixture<JobInforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobInforComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
