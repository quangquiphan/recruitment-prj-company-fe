import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserJobService } from 'src/app/services/user-job.service';

@Component({
  selector: 'app-job-infor',
  templateUrl: './job-infor.component.html',
  styleUrls: ['./job-infor.component.scss']
})
export class JobInforComponent implements OnInit{
  @Input() jobStatus: string = '';
  @Input() users: any[] = [];
  @Input() totalElements: number = 0;
  @Input() totalPages: number = 0;
  @Input() paging: any = {
    jobId: '',
    pageNumber: 1,
    pageSize: 10
  }
  showUserDetail: boolean = false;
  first: number = 0;
  userId: string = '';

  constructor(
  ) {}

  ngOnInit(): void {
    console.log(this.users);
    console.log(this.paging);
    
  }

  onPageChange(ev: any) {
    if (ev) {
      this.paging.pageSize = ev.rows
    }

    this.paging.pageNumber = this.first + 1;
  }

  openPoup(id: string) {
    return [this.userId = id, this.showUserDetail = true];
  }
}