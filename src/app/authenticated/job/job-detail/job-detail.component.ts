import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit{
  selectedTab: number = 0;
  tabViews: any[] = [
    {
      tab: 0,
      label: 'label.general'
    },
    {
      tab: 1,
      label: 'label.applied'
    },
    {
      tab: 2,
      label: 'label.rejected'
    },
  ]

  ngOnInit(): void {
    
  }

}
