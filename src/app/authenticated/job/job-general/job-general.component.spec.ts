import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobGeneralComponent } from './job-general.component';

describe('JobGeneralComponent', () => {
  let component: JobGeneralComponent;
  let fixture: ComponentFixture<JobGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
