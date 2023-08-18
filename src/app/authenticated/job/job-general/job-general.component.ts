import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/model/job.model';

@Component({
  selector: 'app-job-general',
  templateUrl: './job-general.component.html',
  styleUrls: ['./job-general.component.scss']
})
export class JobGeneralComponent implements OnInit{
  @Input() job: Job | undefined;

  ngOnInit(): void {
    
  }
}
