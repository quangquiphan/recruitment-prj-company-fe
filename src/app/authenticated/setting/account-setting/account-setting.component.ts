import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserService } from 'src/app/services/user.service';
import AppConstant from 'src/app/utilities/app-constant';
import AppUtil from 'src/app/utilities/app-util';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss']
})
export class AccountSettingComponent implements OnInit{
  @Input() companyId: string = '';
  @Input() userRole: string = '';
  accountForm: FormGroup = new FormGroup({});
  accountMember: any[] = [];
  listAccount: any[] = [];
  paging: any = {
    companyId: '',
    pageNumber: 1,
    pageSize: 5
  }
  disable: boolean = false;
  label: string = '';
  userId: string = '';
  constant = AppConstant;
  first: number = 0;
  totalElements: number = 0;
  totalPages: number = 0;
  showMemberSetting: boolean = false;
  isConfirmDelete: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private authenticateService: AuthenticateService,
  ) {
    this.accountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.pattern(AppConstant.PATTERNS.EMAIL)],
      role: [this.constant.USER_ROLE.COMPANY_MEMBER],
      companyId: ['']
    })
  }

  ngOnInit(): void {
    this.paging.companyId = this.companyId;
    this.getCompanyMember();
  }

  onPageChange(ev: any) {
    if (ev) {
      this.paging.pageNumber = (ev.first / ev.rows) + 1;
    }

    return this.showAccount(this.listAccount);
  }

  onSubmit(id: string) {
    if (id) {
      return this.updateMember(id, this.accountForm.value);
    }

    return this.addMember(this.accountForm.value);
  }

  onOpen(id: string, role: string) {
    if (!this.checkRole(role)) {
      return AppUtil.getMessageFailed(this.messageService, this.translateService,
        'message.permission_access_denied');
    }

    this.showMemberSetting = true;
    this.userId = id;
    this.accountForm.patchValue({
      companyId: this.paging.companyId
    })

    if (id) {
      this.getUserDetail(id);
      return this.label = this.translateService.instant('label.edit_member');
    }
    return this.label = this.translateService.instant('label.add_member');
  }

  onCancel() {
    this.showMemberSetting = false;
    this.accountForm.reset();
  }

  addMember(params: any) {
    if (!params) return;

    return this.userService.addMember(AppUtil.toSnakeCaseKey(params)).subscribe(
      res => {
        if (res.status === 200) {
          AppUtil.getMessageSuccess(this.messageService, this.translateService, 
            'message.add_member_successfully');
          this.getCompanyMember();
          this.showMemberSetting = false;
          this.accountForm.reset();
        } else {
          AppUtil.getMessageSuccess(this.messageService, this.translateService, 
            'message.add_member_failed');
        }
      }
    )
  }

  updateMember(id: string, params: any) {
    if (!id) return;

    return this.userService.updateMember(id, AppUtil.toSnakeCaseKey(params)).subscribe(
      res => {
        if (res.status === 200) {
          AppUtil.getMessageSuccess(this.messageService, this.translateService, 
            'message.edit_member_successfully');
          this.getCompanyMember();
          this.showMemberSetting = false;
          this.accountForm.reset();
        } else {
          AppUtil.getMessageSuccess(this.messageService, this.translateService, 
            'message.edit_member_failed');
        }
      }
    )
  }

  deleteUser(id: string) {
    if (!id) return;

    return this.userService.deleteUser(id).subscribe(
      res => {
        if (res.status === 200) {
          AppUtil.getMessageSuccess(this.messageService, this.translateService, 
            'message.delete_member_successfully');
          this.getCompanyMember();
          this.showMemberSetting = false;
          this.isConfirmDelete = false;
          this.accountForm.reset();
        } else {
          AppUtil.getMessageSuccess(this.messageService, this.translateService, 
            'message.delete_member_failed');
          this.isConfirmDelete = false;
        }
      } 
    )
  }

  getUserDetail(id: string) {
    this.userService.getUser(id).subscribe(
      res => {
        if (res.status === 200) {
          this.accountForm.patchValue({
            lastName: res.data.lastName,
            firstName: res.data.firstName,
            email: res.data.email,
            role: res.data.role,
          })          
        }
      }
    )
  }

  getCompanyMember() {
    return this.userService.getCompanyMember(this.paging).subscribe(
      res => {
        if (res.status === 200) {
          this.listAccount = res.data.content;
          this.totalElements = res.data.totalElements;
          this.totalPages = res.data.totalPages;
          this.showAccount(this.listAccount);
        }
      }
    )    
  }

  showAccount(list: any) {
    this.accountMember = [];
    for (let i = 0; i < list.length; i++) {
      if (i >= (this.paging.pageNumber - 1) * this.paging.pageSize &&
        i < this.paging.pageNumber * this.paging.pageSize) {
        this.accountMember.push(list[i]);
      }
    }
    return this.accountMember;
  }

  checkRole(role: string) {
    let disable = false;
    switch (this.authenticateService.authUser?.role) {
      case AppConstant.USER_ROLE.COMPANY_ADMIN:
        disable = true;
        break;

      case AppConstant.USER_ROLE.COMPANY_ADMIN_MEMBER:
        if (role !== AppConstant.USER_ROLE.COMPANY_ADMIN) {
          disable = true;
        }
      break;

      case AppConstant.USER_ROLE.COMPANY_MEMBER:
        disable = false;
        break;
    }

    return disable;
  }

  parseRole(role: string) {
    return this.translateService.instant(`role.${role}`);
  }
}