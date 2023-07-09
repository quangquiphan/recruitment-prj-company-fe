import { NgModule } from "@angular/core";
import { AuthenticatedComponent } from "./authenticated.component";
import { CommonModule } from "@angular/common";
import { AuthenticatedRoutingModule } from "./authenticated-routing.module";
import { PrimeNgModule } from "../prime-ng/prime-ng.module";

@NgModule({
    declarations: [
        AuthenticatedComponent
    ],

    imports: [
        CommonModule,
        AuthenticatedRoutingModule,
        PrimeNgModule
    ]
})
export class AuthenticatedModule{}