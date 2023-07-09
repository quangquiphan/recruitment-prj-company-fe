import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PrimeNgModule } from "../prime-ng/prime-ng.module";
import { UnAuthenticatedComponent } from "./un-authenticated.component";
import { UnAuthenticatedRoutingModule } from "./un-authenticated-routing.module";
import { SignInComponent } from './sign-in/sign-in.component';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [
        UnAuthenticatedComponent,
        SignInComponent
    ],

    imports: [
        CommonModule,
        PrimeNgModule,
        TranslateModule,
        UnAuthenticatedRoutingModule
    ]
})
export class UnAuthenticatedModule {}