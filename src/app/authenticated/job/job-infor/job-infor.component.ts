import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { UserJobService } from 'src/app/services/user-job.service';
import AppConstant from 'src/app/utilities/app-constant';
import AppUtil from 'src/app/utilities/app-util';

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
  @Output() onReload: EventEmitter<any> = new EventEmitter();
  showUserDetail: boolean = false;
  first: number = 0;
  userId: string = '';
  isRejectCandiate: boolean = false;
  message: string = '';
  userJobId: string = '';

  constructor(
    private userJobService: UserJobService,
    private messageService: MessageService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
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

  onReject() {
    let params = {
      userJobId: this.userJobId,
      status: AppConstant.JOB_STATUS.REJECTED
    }

    return this.userJobService.changeJobStatus(params).subscribe(
      res => {
        if (res.status === 200) {
          this.isRejectCandiate = false;
          this.message = '';
          AppUtil.getMessageSuccess(this.messageService, this.translateService,
            'message.reject_candidate_successfully');
        } else {
          AppUtil.getMessageSuccess(this.messageService, this.translateService,
            'message.reject_candidate_failed');
        }
      }
    )
  }

  parseYearExperience(yearExperience: string) {
    if (!yearExperience) yearExperience = 'NON_EXPERIENCE';
    return this.translateService.instant(`YEAR_EXPERIENCE.${yearExperience}`);
  }

  parseDate(date: string) {
    return moment(moment(date).subtract(7, 'hours')).format('DD-MM-YYYY HH:mm');
  }

  parseLabelDate(jobStatus: string, date: string, lastName: string, firstName: string) {
    if (jobStatus === AppConstant.JOB_STATUS.APPLIED) {
      return this.translateService.instant('message.requested_on_date', 
        {name: lastName + ' ' + firstName, date: this.parseDate(date)});
    }

    return this.translateService.instant('message.rejected_on_date', 
      {name: lastName + ' ' + firstName, date: this.parseDate(date)});
  }

  parseLabelRejectCandidate(lastName: string, firstName: string, id: string) {
    this.userJobId = id;
    this.isRejectCandiate = true;
    return this.message = this.translateService.instant('message.do_you_wanna_reject_candidate',
      {candidate: lastName + ' ' + firstName})
  }
}