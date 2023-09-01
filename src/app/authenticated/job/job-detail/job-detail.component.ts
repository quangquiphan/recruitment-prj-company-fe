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
  job: Job | undefined;
  users: any[] = [];
  userShow: any[] = [];
  isShowPopupForm: boolean = false;
  isShowConfirmDeletePopup = false;
  totalElements: number = 0;
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
    this.selectedTabViewUrl(this._router.routerState.snapshot.url);
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

  onReload(ev: any) {
    this.userShow = [];

    if (ev) {
      this.paging.pageNumber = ev.first/ev.rows + 1;
    }

    for (let i = 0; i < this.users.length; i++) {
      if (i >= (this.paging.pageNumber - 1) 
          && i < (this.paging.pageNumber * this.paging.pageSize)) {
        this.userShow.push(this.users[i]);
      }
    }

    return this.userShow;
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

  selectedTabViewUrl(url: string) {
    let arr = toArray(url.split("/"))
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

  getUserApplicant(status: string) {
    this.users = [];
    this.userShow = [];
    return this.userJobService.getUser(status, this.paging).subscribe(
      res => {
        if (res.status === 200) {
          this.users = res.data;
          this.totalElements = res.data.length;

          for (let i = 0; i < this.users.length; i++) {
            if (i >= (this.paging.pageNumber - 1) 
              && i < (this.paging.pageNumber * this.paging.pageSize)) {
              this.userShow.push(this.users[i]);
            }
          }
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
      tab = "applied";
      this.getUserApplicant(tab);
    }
    
    if (selectedTab === 2) {
      tab = "rejected";
      this.getUserApplicant(tab);
    }

    return this._router.navigate([`/jobs/${this.jobId}/${tab}`]).then(r => {});
  }

  parseDate(date: string) {
    return moment(date).format(AppConstant.DATE_FORMAT.GET);
  }
}