import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticateService } from "../services/authenticate.service";
import { Router } from "@angular/router";
import { Observable, map } from "rxjs";
import AppConstant from "../utilities/app-constant";
import AppUtil from "../utilities/app-util";
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "primeng/api";


@Injectable() export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticateService: AuthenticateService, 
        private router: Router,
        private translate: TranslateService,
        private messageService: MessageService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        request = request.clone({
            url: `${AppConstant.DEFAULT_URL.API}${request.url}`,
            setHeaders: {
                'Auth-Token': `${this.authenticateService.token}`
            }
        });

        return next.handle(request).pipe(map((event) => {
            //@ts-ignore
            if (event && event.body) {
                //@ts-ignore
                event.body = AppUtil.toCamelCaseKey({ obj: event.body });
                //@ts-ignore
                if (event.body?.status && event.body.status !== 200 && event.body.status !== 403) {
                    // @ts-ignore
                     if(event.body.status === 401){
                       // Token had been expired
                       this.authenticateService.clearSession()
                       this.router.navigate(['/sign-in']).then(res => {});
                     }
                     else {
                       // check and set not allow to show toast in login page
                       if(request.url.includes('/api/auth') || request.url.includes('/sign-in')) {
                         AppUtil.toast(null, null, false);
                       }
                       else {
                         // @ts-ignore
                         let key = event.body.data || `error.${event.body.status}`;
                         this.translate.get(key).subscribe(error => {
                           AppUtil.toast(error, event, true, this.messageService);
                         });
                       }
                    }
                }                 
            }
            return event;
        }));
    }
}
