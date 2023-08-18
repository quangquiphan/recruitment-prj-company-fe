import { NgModule } from "@angular/core";
import { AuthenticatedComponent } from "./authenticated.component";
import { CommonModule } from "@angular/common";
import { AuthenticatedRoutingModule } from "./authenticated-routing.module";
import { PrimeNgModule } from "../prime-ng/prime-ng.module";
import { AuthenticateMenuComponent } from './authenticate-menu/authenticate-menu.component';
import { JobComponent } from './job/job.component';
import { SettingComponent } from './setting/setting.component';
import { JobTableComponent } from './job/job-table/job-table.component';
import { JobGeneralComponent } from './job/job-general/job-general.component';
import { JobInforComponent } from './job/job-infor/job-infor.component';
import { JobDetailComponent } from './job/job-detail/job-detail.component';
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule } from "@angular/forms";
import { JobFormComponent } from './job/job-form/job-form.component';
import { SkillComponent } from './skill/skill.component';
import { CompanySettingComponent } from './setting/company-setting/company-setting.component';
import { AccountSettingComponent } from './setting/account-setting/account-setting.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
    declarations: [
        AuthenticatedComponent,
        AuthenticateMenuComponent,
        JobComponent,
        SettingComponent,
        JobTableComponent,
        JobGeneralComponent,
        JobInforComponent,
        JobDetailComponent,
        JobFormComponent,
        SkillComponent,
        CompanySettingComponent,
        AccountSettingComponent,
        UserInfoComponent,
    ],

    imports: [
        CommonModule,
        PrimeNgModule,
        TranslateModule,
        ReactiveFormsModule,
        AuthenticatedRoutingModule,
    ]
})
export class AuthenticatedModule{}