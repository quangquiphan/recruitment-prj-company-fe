import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticatedComponent } from "./authenticated.component";
import { AuthGuard } from "../interceptors/auth-guard.service";
import { JobComponent } from "./job/job.component";
import { SettingComponent } from "./setting/setting.component";
import { JobDetailComponent } from "./job/job-detail/job-detail.component";
import { JobTableComponent } from "./job/job-table/job-table.component";

const routes: Routes = [
    {
        path: '',
        component: AuthenticatedComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'jobs',
                component: JobComponent,
                children: [
                    {
                        path: '',
                        component: JobTableComponent,
                    },
                    {
                        path: ':id',
                        component: JobDetailComponent,
                        children: [
                            {
                                path: 'general',
                                component: JobDetailComponent
                            },
                            {
                                path: 'applied',
                                component: JobDetailComponent
                            },
                            {
                                path: 'rejected',
                                component: JobDetailComponent
                            },
                        ]
                    }
                ]
            },
            {
                path: 'setting',
                component: SettingComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AuthenticatedRoutingModule{}