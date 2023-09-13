import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { AuthUser } from 'src/app/model/auth-user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CompanyService } from 'src/app/services/company.service';
import AppConstant from 'src/app/utilities/app-constant';
import AppData from 'src/app/utilities/app-data';
import AppUtil from 'src/app/utilities/app-util';

@Component({
  selector: 'app-company-setting',
  templateUrl: './company-setting.component.html',
  styleUrls: ['./company-setting.component.scss']
})
export class CompanySettingComponent implements OnInit{
  @Input() companyId: string = '';
  companyForm: FormGroup = new FormGroup({});
  authUser: AuthUser | undefined;
  isEditCompanyPopup: boolean = false;
  company: any;
  sizes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private authenticateService: AuthenticateService
  ) {
    this.companyForm = this.fb.group({
      email: [''],
      companyName: ['', Validators.required],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.PHONE)
      ]],
      website: [''],
      overview: [''],
      address: [''],
      size: ['']
    })
  }

  ngOnInit(): void {
    this.authUser = this.authenticateService.authUser;
    this.getCompanyDetail();
    this.sizes = AppData.getCompanySize(this.translateService);
  }

  onSubmit() {
    return this.companyService.updateCompany(this.companyId, AppUtil.toSnakeCaseKey(this.companyForm.value))
      .subscribe(
        res => {
          if (res.status === 200) {
            AppUtil.getMessageSuccess(this.messageService, this.translateService,
              'message.update_company_successfully');
            this.isEditCompanyPopup = false;
            this.getCompanyDetail();
            window.location.reload();
          } else {
            AppUtil.getMessageFailed(this.messageService, this.translateService,
              'message.update_company_failed');
          }
        }
      )
  }

  onCancel() {
    this.getCompanyDetail();
    this.isEditCompanyPopup = false;
  }

  getCompanyDetail() {
    return this.companyService.getCompany(this.companyId).subscribe(
      res => {
        if (res.status === 200) {
          this.company = res.data;
          this.companyForm.patchValue({
            email: res.data.email,
            companyName: res.data.companyName,
            phoneNumber: res.data.phoneNumber,
            website: res.data.website,
            overview: res.data.overview,
            address: res.data.address,
            size: res.data.size
          });
        }
      }
    )
  }

  parseSize(size: string) {
    return this.translateService.instant(`SIZE.${size}`);
  }

  selectedAvatar(ev: any) {
    if (ev) {
      let file = ev.target.files[0];
      
      return this.uploadAvatar(file);
    }
    return;
  }

  uploadAvatar(file: any) {
    return this.companyService.uploadAvatar(this.companyId || '', file).subscribe({
      next: (event : any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.getCompanyDetail();
          window.location.reload();
        }
      }
    })
  }
}
