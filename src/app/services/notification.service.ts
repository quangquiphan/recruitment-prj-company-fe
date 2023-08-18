import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import HttpResponse from '../model/http.response.model';
import { Observable, map } from 'rxjs';

let _prefix ="/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient
  ) { }

  getAllNotificationByCompany(params: any) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  markAsRead(id: string) : Observable<HttpResponse> {
    return this.http.put<HttpResponse>(`${_prefix}/${id}`, {}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  markAllAsRead(companyId: string) : Observable<HttpResponse> {
    return this.http.put<HttpResponse>(`${_prefix}`, companyId).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
}
