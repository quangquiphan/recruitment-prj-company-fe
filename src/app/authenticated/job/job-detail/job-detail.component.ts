import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { toArray } from 'lodash';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Job } from 'src/app/model/job.model';
import { JobService } from 'src/app/services/job.service';
import { UserJobService } from 'src/app/services/user-job.service';
import AppConstant from 'src/app/utilities/app-constant';
import AppUtil from 'src/app/utilities/app-util';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit{
  selectedTab: number = 0;
  jobId: string = '';
  jobStatus: string = ''
  job: Job | undefined;
  users: any[] = [];
  isShowPopupForm: boolean = false;
  isShowConfirmDeletePopup = false;
  totalElements: number = 0;
  totalPages: number = 0;
  paging: any = {
    jobId: '',
    pageNumber: 1,
    pageSize: 10
  }
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

  constructor(
    private _router: Router,
    private jobService: JobService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private userJobService: UserJobService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.jobId = this.activatedRoute.snapshot.paramMap.get("id") || '';
    this.paging.jobId = this.jobId;
    this.selectedTabViewUrl();
    this.getJobDetail(this.jobId);
  }

  getJobDetail(jobId: string) {
    if (!jobId)  return;

    this.jobService.getJob(jobId).subscribe(
      res => {
        if (res.status === 200) {
          this.job = res.data;
        }
      }
    )
  }

  onOpen(ev: any) {
    if (ev) {
      this.getJobDetail(this.jobId);
      this.isShowPopupForm = false;
    }
  }

  onBack() {
    return this._router.navigate(['/jobs']).then(r => {});
  }

  onDelete(id: any) {
    if (!id) return;

    return this.jobService.deleteJob(id).subscribe(
      res => {
        if (res.status === 200) {
          AppUtil.getMessageSuccess(this.messageService, this.translateService,
            'message.delete_job_successfully!');
          this.isShowPopupForm = false;
          this.isShowConfirmDeletePopup = false;
          this.onBack();
        } else {
          AppUtil.getMessageSuccess(this.messageService, this.translateService,
            'message.delete_job_successfully!');
          this.isShowPopupForm = false;
          this.isShowConfirmDeletePopup = false;
        }
      }
    )
  }

  confirmDelete(ev: any) {
    if (ev) {
      this.isShowConfirmDeletePopup = true;
    }
  }

  selectedTabViewUrl() {
    let arr = toArray(this._router.routerState.snapshot.url.split("/"))
    const map = new Map();
    
    if (arr.length === 3) {
      arr.push();
    }

    map.set('tab', arr[3]);

    if (map.get('tab') === 'general' || !map.get('tab')) {
      this.selectedTab = 0;
    } else if (map.get('tab') === 'applied') {
      this.selectedTab = 1;
    } else if (map.get('tab') === 'rejected') {
      this.selectedTab = 2;
    }

    this.activatedTabView(this.selectedTab);
  }

  onChangeTabView(event: any) {
    this.selectedTab = event.index;
    this.activatedTabView(this.selectedTab);
  }

  getUser(jobStatus: string) {
    console.log(jobStatus);
    
    return this.userJobService.getUser(jobStatus, this.paging).subscribe(
      res => {
        if (res.status === 200) {
          console.log(res.status);
          
          this.users = res.data.content;
          this.totalPages = res.data.totalPages;
          this.totalElements = res.data.totalElements;
        }
      }
    )
  }

  activatedTabView(selectedTab: number) {
    let tab = '';

    if (selectedTab === 0) {
      tab = "general";  
    } 
    
    if (selectedTab === 1) {
      this.jobStatus = AppConstant.JOB_STATUS.APPLIED;
      tab = "applied";
      this.getUser(this.jobStatus);
    }
    
    if (selectedTab === 2) {
      this.jobStatus = AppConstant.JOB_STATUS.REJECTED;
      tab = "rejected";
      this.getUser(this.jobStatus);
    }

    return this._router.navigate([`/jobs/${this.jobId}/${tab}`]).then(r => {});
  }

  parseDate(date: string) {
    return moment(moment((date), 'DD-MM-YYYY').toDate()).format("DD-MM-YYYY");
  }
}