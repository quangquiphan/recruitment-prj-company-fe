import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthUser } from 'src/app/model/auth-user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import AppConstant from 'src/app/utilities/app-constant';
import AppData from 'src/app/utilities/app-data';
import AppUtil from 'src/app/utilities/app-util';

@Component({
  selector: 'app-authenticate-menu',
  templateUrl: './authenticate-menu.component.html',
  styleUrls: ['./authenticate-menu.component.scss']
})
export class AuthenticateMenuComponent implements OnInit{
  changePasswordForm: FormGroup = new FormGroup({});
  changeInfoForm: FormGroup = new FormGroup({});
  authUser: AuthUser | undefined;
  selectedTab: number = 0;
  href: string = '';
  isOnlyView: boolean = true;
  isShowSidebar: boolean = false;
  isChangePasswordPopup: boolean = false;
  isShowProfilePopup: boolean = false;
  avatar: any;
  notificationFilter: any[] = [];
  gender: any[] = [];
  majors: any[] = [];
  items: MenuItem[] = [];
  leftMenu: any[] = [
    {
      index: 0,
      path: '/jobs',
      label: 'label.jobs',
      icon: '../../../assets/images/icons/briefcase.svg'
    },
    {
      index: 1,
      path: '/skills',
      label: 'label.skills',
      icon: '../../../assets/images/icons/colorfilter.svg'
    },
    {
      index: 2,
      path: '/setting',
      label: 'label.setting',
      icon: '../../../assets/images/icons/setting-2.svg'
    }
  ];
  notifications: any[] = [];
  paging: any = {
    companyId: '',
    filter: 'ALL',
    pageNumber: 1,
    pageSize: 20
  };
  totalElements: number = 0;
  totalPages: number = 0;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private userService: UserService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private authenticatService: AuthenticateService,
    private notificationService: NotificationService,
  ) {

    this.changeInfoForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      gender: [''],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.PHONE)
      ]],
      dateOfBirth: ['', Validators.required]
    })

    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.PASSWORD)
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.PASSWORD)
      ]],
      confirmNewPassword: ['', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.PASSWORD)
      ]]
    })

    this.gender = AppData.getGender(translateService);
    this.majors = AppData.getMajor(translateService);
  }

  ngOnInit(): void {
    this.getInfo();
    this.initMenu();
    
    this._router.events.subscribe((e : any) => {
      if (e?.routerEvent) {
        this.href = e?.routerEvent.url;
        this.selectedTab = e?.routerEvent.id;
        this.getSelectedTab(this.href);        
      }
    });

    this.notificationFilter = [
      {
        id: "ALL",
        label: this.translateService.instant('label.all')
      },
      {
        id: "READ",
        label: this.translateService.instant('label.read')
      },
      {
        id: "UN_READ",
        label: this.translateService.instant('label.un_read')
      }
    ];
  }

  onSignOut() {
    this.authenticatService.logout().subscribe(
      res => {
        if (res.status === 200) {
          this.authenticatService.deleteToken();
          this.authenticatService.clearSession();
          this.authenticatService.doResetAuthUser();
          this._router.navigate(['/sign-in']).then(r => {});
        }
      }
    )
  }

  onChangePassword() {
    let params = {
      oldPassword: AppUtil.hasMD5(this.changePasswordForm.value.oldPassword),
      newPassword: AppUtil.hasMD5(this.changePasswordForm.value.newPassword),
      confirmNewPassword: AppUtil.hasMD5(this.changePasswordForm.value.confirmNewPassword),
    }
    
    return this.authenticatService.changePassword(AppUtil.toSnakeCaseKey(params)).subscribe(
      res => {
        if (res.status === 200) {
          AppUtil.getMessageSuccess(this.messageService, this.translateService,
            'message.change_password_successfully');
          this.isChangePasswordPopup = false;
          this.changePasswordForm.reset();
        } else {
          AppUtil.getMessageFailed(this.messageService, this.translateService,
            'message.change_password_failed');
        }
      }
    )
  }

  onUpdate() {
    let params = {
      lastName: this.changeInfoForm.value.lastName,
      firstName: this.changeInfoForm.value.firstName,
      phoneNumber: this.changeInfoForm.value.phoneNumber,
      gender: this.changeInfoForm.value.gender,
      dateOfBirth: moment(this.changeInfoForm.value.dateOfBirth).format("YYYY-MM-DD"),
      skills: [],
      languages: []
    }

    return this.userService.updateUser(this.authUser?.id || '', AppUtil.toSnakeCaseKey(params)).subscribe(
      res => {
        if (res.status === 200) {
          AppUtil.getMessageSuccess(this.messageService, this.translateService,
            'message.update_information_successfully');
          this.getProfileUser();
          this.isShowProfilePopup = false;
        } else {
          AppUtil.getMessageFailed(this.messageService, this.translateService, 
            'message.update_information_failed');
        }
      }
    )
    
  }

  onFilterNoti(ev?: any) {
    if (ev) {
      this.paging.filter = ev.value;
    }
    this.notifications = [];
    this.getAllNotification(this.paging);
  }

  markAllAsRead() {
    return this.notificationService.markAllAsRead(this.paging.companyId).subscribe(
      res => {
        if (res.status == 200) {
          this.notifications = [];
          this.getAllNotification(this.paging);
        }
      }
    )
  }

  markAsRead(id: string) {
    return this.notificationService.markAsRead(id).subscribe(
      res => {
        if (res.status === 200) {
          this.notifications = [];
          this.getAllNotification(this.paging);
        }
      }
    )
  }

  loadMore() {
    this.paging.pageNumber += 1;
    this.getAllNotification(this.paging);
  }

  initMenu() {
    this.items = [
      {
        label: this.translateService.instant('label.profile'),
        icon: 'pi pi-user',
        command: () => {
          this.isShowProfilePopup = true;
          this.getProfileUser();
        }
      },
      {
        label: this.translateService.instant('label.change_password'),
        icon: 'pi pi-eye',
        command: () => {
          this.isChangePasswordPopup = true
        }
      },
      {
        label: this.translateService.instant('button.sign_out'),
        icon: 'pi pi-sign-out',
        command: () => {
          this.onSignOut();
        }
      }
    ];
  }

  getInfo() {
    this.authUser = this.authenticatService.authUser;
    this.paging.companyId = this.authUser?.company.id;
    this.getAllNotification(this.paging);
  }

  getProfileUser() {
    this.userService.getUser(this.authUser?.id || '').subscribe(
      res => {
        if (res.status === 200) {
          this.avatar = res.data.avatar;
          this.changeInfoForm.patchValue({
            lastName: res.data.lastName || '',
            firstName: res.data.firstName || '',
            phoneNumber: res.data.phoneNumber || '',
            gender: res.data.gender || '',
            dateOfBirth: moment(res.data.dateOfBirth).format("DD-MM-YYYY")
          })
        }
      }
    )
  }

  getSelectedTab(url: any) {
    if (this.href.includes('jobs')) {
      this.selectedTab = 0;
    } else if (this.href.includes('skills')) {
      this.selectedTab = 1;
    } else if (this.href.includes('setting')) {
      this.selectedTab = 2;
    }
  }

  getAllNotification(paging: any) {
    return this.notificationService.getAllNotificationByCompany(paging)
      .subscribe(
        res => {
          if (res.status === 200) {
            res.data.content.forEach((element: any) => {
              this.notifications.push(element)
            });
            this.totalElements = res.data.totalElements;
            this.totalPages = res.data.totalPages;        
          }
        }
      )
  }


  selectedAvatar(ev: any) {
    if (ev) {
      let avatar = ev.target.files[0];

      return this.userService.uploadAvatar(this.authUser?.id || '', avatar).subscribe({
        next: (event : any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.getProfileUser();
          }
        }
      })
    }

    return;
  }

  parseIconText(email: string | undefined) {
    return (email || '').charAt(0).toUpperCase();
  }

  parseFullName(lastName: string, firstName: string) {
    return lastName + ' ' + firstName;
  }

  parseContent(content: string, lastName: string, firstName: string, position: string) {
    return this.translateService.instant(`message.${content}`, 
      {name: this.parseFullName(lastName, firstName), position: position});
  }
}
