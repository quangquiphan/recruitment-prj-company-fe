import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticateService } from "../services/authenticate.service";
import { Observable, map, of } from "rxjs";
import { AuthUser } from "../model/auth-user.model";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticateService: AuthenticateService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        if (!this.authenticateService.token) {
            this.router.navigate(['sign-in']).then((r) => {});
            return of(true);
        }

        return this.authenticateService.getAuthInfo().pipe(
            map(
                (res: any) => {
                    const authUser: AuthUser = res.data;
                    this.authenticateService.setAuthUser(authUser);
                    return true;
                },
                (error: any) => {
                    this.authenticateService.clearSession();
                    this.router.navigate(['/sign-in']).then((r) => {});
                    return false;
                }
            )
        );
    }
}