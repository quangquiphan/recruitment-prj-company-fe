import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
          console.log(this.candidate);
          
        }
      }
    )
  }

  getFullName(firstName: any, lastName: any) {
    return firstName + " " + lastName;
  }

  getYearExperience(year: any) {
    if (year) {
      return this.translateService.instant(`YEAR_EXPERIENCE.${year}`);
    }

    return 0;
  }
}
