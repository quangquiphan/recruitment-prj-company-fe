import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthUser} from '../model/auth-user.model';
import {BehaviorSubject, Observable, map} from 'rxjs';
import AppConstant from '../utilities/app-constant';
import HttpResponse from '../model/http.response.model';


let _prefix = "/authenticated";

@Injectable({providedIn: 'root'})

export class AuthenticateService {

    authUser : AuthUser | undefined;

    resetAuthUser = new BehaviorSubject("Reset Auth User");

    constructor(private http : HttpClient) {}

    public doResetAuthUser(): void {
        this.resetAuthUser.next("");
    }

    public setToken(token : string): void {
        localStorage.setItem(AppConstant.STORAGE_KEY.SESSION, token);
    }

    public get token(): string | null {
        return localStorage.getItem(AppConstant.STORAGE_KEY.SESSION);
    }

    public deleteToken(): void {
        localStorage.removeItem(AppConstant.STORAGE_KEY.SESSION);
    }

    public clearSession(): void {
        this.setAuthUser(undefined);
        this.deleteToken();
        localStorage.clear();
    }

    public setAuthUser(authUser : AuthUser | undefined): void {
        this.authUser = authUser;
    }

    login(params: any): Observable<HttpResponse> {
      return this.http.post<HttpResponse>(`${_prefix}/sign-in`, params).pipe(
        map(
            result => {
                return result;
            }
        )
      );
    }

    getAuthInfo(): Observable<HttpResponse> {
        return this.http.get<HttpResponse>(`${_prefix}/info`).pipe(
            map(
                result => {
                    return result;
                }
            )
        );
    }

    logout(): Observable<HttpResponse> {
        return this.http.delete<HttpResponse>(`${_prefix}/logout`).pipe(
            map(
                (result) => {
                    return result;
                }
            )
        );
    }

    forgotPassword(params: any): Observable<HttpResponse> {
        return this.http.post<HttpResponse>(`${_prefix}/forgot-password`, params).pipe(
            map(
                (result) => {
                    return result;
                }
            )
        );
    }

    resetPassword(resetPassword: string, params: any) : Observable<HttpResponse> {
        return this.http.put<HttpResponse>(`${_prefix}/reset-password/${resetPassword}`, params).pipe(
            map(
                (result) => {
                    return result;
                }
            )
        )
    }

    changePassword(params: any) : Observable<HttpResponse> {
        return this.http.put<HttpResponse>(`${_prefix}/change-password`, params).pipe(
            map(
                (result) => {
                    return result;
                }
            )
        )
    }
}

