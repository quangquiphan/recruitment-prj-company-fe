import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AuthUser } from 'src/app/model/auth-user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.scss']
})
export class JobTableComponent implements OnInit{
  authUser: AuthUser | undefined;
  jobs: any[] = [];
  paging: any = {
    pageNumber: 1,
    pageSize: 10
  }
  totalElements: number = 0;
  totalPages: number = 0;
  first: number = 0;
  isShowPopupForm: boolean = false;

  constructor(
    private jobService: JobService,
    private translateService: TranslateService,
    private authenticateService: AuthenticateService
  ) {}

  ngOnInit(): void {
    this.authUser = this.authenticateService.authUser
    this.getAllJobs();
    this.totalElements = this.jobs.length;
  }

  onPageChange(ev: any) {
  }

  checkExpiryDateJob(expiryDate: string) {
    let expiry = new Date(expiryDate);
    let now = new Date();

    return expiry.getTime() - now.getTime() < 0;
  }

  getAllJobs() {
    let params = {
      companyId: this.authUser?.company.id,
      pageNumber: this.paging.pageNumber,
      pageSize: this.paging.pageSize
    }

    this.jobService.getAllJobByCompanyId(params).subscribe(
      res => {
        if (res.status === 200) {
          this.jobs = res.data.content;
          this.totalElements = res.data.totalElements,
          this.totalPages = res.data.totalPages;
        }
      }
    )
  }

  onCancel(ev: any) {
    this.getAllJobs();
    this.isShowPopupForm = false;
  }

  parseDate(date: string) {
    return moment(moment(date, 'DD-MM-YYYY').toDate()).format("DD-MM-YYYY");
  }

  parseSalary(salary: string) {
    return this.translateService.instant(`salary.${salary}`);
  }
}