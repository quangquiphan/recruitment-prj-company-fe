import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { SuccessfullyRequestComponent } from "./successfully-request/successfully-request.component";

const routes: Routes = [
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password/:reset-code',
        component: ResetPasswordComponent
    },
    {
        path: 'check-your-email',
        component: SuccessfullyRequestComponent
    },
    {
        path: 'successfully',
        component: SuccessfullyRequestComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class UnAuthenticatedRoutingModule {}