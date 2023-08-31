import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Language } from 'src/app/model/lang.model';
import { Skill } from 'src/app/model/skill.model';
import { JobService } from 'src/app/services/job.service';
import { LanguageService } from 'src/app/services/language.service';
import { SkillService } from 'src/app/services/skill.service';
import AppConstant from 'src/app/utilities/app-constant';
import AppData from 'src/app/utilities/app-data';
import AppUtil from 'src/app/utilities/app-util';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit{
  @Input() companyId: string = '';
  @Input() jobId: string = '';
  @Output() isLoadData: EventEmitter<any> = new EventEmitter();
  @Output() isDelete: EventEmitter<any> = new EventEmitter();
  jobForm: FormGroup = new FormGroup({});
  listSkills: Skill[] = [];
  listLang: Language[] = [];
  categoryJob: any[] = [];
  selectedCategory: string = '';
  cities: any[] = AppData.getListCity();
  salary: any[] = [];

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private skillService: SkillService,
    private messageService: MessageService,
    private languageService: LanguageService,
    private translateService: TranslateService
  ) {
    this.categoryJob = AppData.getMajor(this.translateService);
    this.salary = AppData.getSalary(translateService);
    this.jobForm = fb.group({
      jobName: ['', Validators.required],
      jobPosition: ['', Validators.required],
      description: [''],
      required: [''],
      benefited: [''],
      salary: [this.salary[0].id],
      city: [this.cities[29].name],
      categoryJob: [this.categoryJob[0].id],
      address: [''],
      expiryDate: [''],
      skills: fb.array([]),
      languages: fb.array([])
    });
  }

  ngOnInit(): void {
    this.getAllLang();
    this.getAllSkill();
    this.getJobDetail();
    
  }

  getJobDetail() {
    if (!this.jobId) return;

    this.jobService.getJob(this.jobId).subscribe(
      res => {
        if (res.status === 200) {
          this.patchValueForm(res.data);
        }
      }
    )
  }

  patchValueForm(data: any) {
    let s = data.skills;
    let l = data.languages;

    for (let index = 0; index < s.length; index++) {
      this.addSkill(s[index])            
    }

    for (let index = 0; index < l.length; index++) {
      this.addLang(l[index]);
    }

    return this.jobForm.patchValue({
      jobName: data.jobName || '',
      jobPosition: data.jobPosition || '',
      description: data.description || '',
      required: data.required || '',
      benefited: data.benefited || '',
      salary: data.salary || '',
      city: data.city || '',
      categoryJob: data.categoryJob || '',
      address: data.address || '',
      expiryDate: moment(data.expiryDate).format(AppConstant.DATE_FORMAT.GET)
    })
  }

  get skills() : FormArray {
    return this.jobForm.get('skills') as FormArray;
  }

  get languages() : FormArray {
    return this.jobForm.get('languages') as FormArray;
  }

  getAllSkill() {
    return this.skillService.getSkills().subscribe(
      res => {
        if (res.status === 200) {
          this.listSkills = res.data;          
        }
      }
    )
  }

  getAllLang() {
    return this.languageService.getAllLang().subscribe(
      res => {
        if (res.status === 200) {
          this.listLang = res.data;
        }
      }
    )
  }

  addSkill(skill?: any) {
    if (this.listSkills.length === 0) return;

    return this.skills.push(
      this.fb.group({
        id: [skill ? skill.id : ''],
        skill_id: [skill ? skill.skillId : this.listSkills[0].id],
        status: [skill ? skill.status : AppConstant.STATUS.ACTIVE]
      })
    );
  }

  removeSkill(index: number) {
    if (this.skills.at(index).value.id) {
      return this.skills.controls[index].patchValue({
        status: AppConstant.STATUS.IN_ACTIVE
      })
    }

    return this.skills.removeAt(index);
  }

  checkSkill(index: number) {
    if (this.skills.at(index).value.status === AppConstant.STATUS.IN_ACTIVE) {
      return false;
    }
    return true;
  }

  addLang(lang?: any) {
    return this.languages.push(
      this.fb.group({
        id: [lang ? lang.id : ''],
        language_id: [lang ? lang.langId : this.listLang[0].id],
        status: [lang ? lang.status : AppConstant.STATUS.ACTIVE]
      })
    );
  }

  removeLang(index: number) {
    if (this.languages.at(index).value.id) {
      return this.languages.controls[index].patchValue({
        status: AppConstant.STATUS.IN_ACTIVE
      })
    }
    
    return this.languages.removeAt(index);
  }

  checkLang(index: number) {
    if (this.languages.at(index).value.status === AppConstant.STATUS.IN_ACTIVE) {
      return false;
    }
    return true;
  }

  onSubmit() {
    let params = {
      address: this.jobForm.value.address,
      benefited: this.jobForm.value.benefited,
      category_job: this.jobForm.value.categoryJob,
      city: this.jobForm.value.city,
      company_id: this.companyId,
      description: this.jobForm.value.description,
      expiry_date: moment(moment(this.jobForm.value.expiryDate, AppConstant.DATE_FORMAT.GET).toDate())
        .format(AppConstant.DATE_FORMAT.POST),
      job_name: this.jobForm.value.jobName,
      job_position: this.jobForm.value.jobPosition,
      languages: this.languages.value,
      required: this.jobForm.value.required,
      salary: this.jobForm.value.salary,
      skills: this.skills.value
    }
    
    if (this.jobId) {
      return this.jobService.updateJob(this.jobId, params).subscribe(
        res => {
          if (res.status === 200) {
            AppUtil.getMessageSuccess(this.messageService, this.translateService, 
              'message.edit_job_successfully');
              this.isLoadData.emit(true);
              this.jobForm.reset();
          } else {
            AppUtil.getMessageFailed(this.messageService, this.translateService, 
              'message.edit_job_failed');
          }
        }
      )
    }
    
    return this.jobService.addJob(params).subscribe(
      res => {
        if (res.status === 200) {
          AppUtil.getMessageSuccess(this.messageService, this.translateService, 
            'message.add_job_successfully');
          this.isLoadData.emit(true);
          this.jobForm.reset();
        } else {
          AppUtil.getMessageFailed(this.messageService, this.translateService, 
            'message.add_job_failed');
        }
      }
    )
  }
}
