import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { CandidateService } from 'src/app/services/candidate.service';
import AppConstant from 'src/app/utilities/app-constant';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit{
  @Input() userId: string = '';
  ev = environment;
  appConstant = AppConstant;
  candidate: any;
  workhistory: any[] = [];
  education: any[] = [];
  skill: any[] = [];
  language: any[] = [];
  user: any = {
    avatar: ''
  };
  constructor(
    private candidateService: CandidateService,
    private translateService: TranslateService
  ) {}

    ngOnInit(): void {
    this.getCandidate(this.userId);
    }

  getCandidate(id: string) {
    this.candidateService.getCandidate(id).subscribe(
      res => {
        if (res.status === 200) {
          this.candidate = res.data;
        }
      }
    )
  }

  getFullName(firstName: any, lastName: any) {
    return firstName + " " + lastName;
  }

  parseFromAndToDate(fromDate: string, toDate: string, isCurrent: boolean) {
    if (isCurrent) {
      return moment(moment(fromDate).toDate()).format(AppConstant.DATE_FORMAT.SHORT_DATE) + ' - ' +
        this.translateService.instant('label.now');
    }

    return moment(moment(fromDate).toDate()).format(AppConstant.DATE_FORMAT.SHORT_DATE) + ' - ' +
      moment(moment(toDate).toDate()).format(AppConstant.DATE_FORMAT.SHORT_DATE)
  }

  parseYearExperience(yearExperience: string) {
    if (!yearExperience) yearExperience = 'NON_EXPERIENCE';
    return this.translateService.instant(`YEAR_EXPERIENCE.${yearExperience}`);
  }

  parseGender(gender: string) {
    if (!gender) return '';

    return this.translateService.instant(`gender.${gender}`)
  }
}
