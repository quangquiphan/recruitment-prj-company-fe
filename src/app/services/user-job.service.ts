import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import HttpResponse from '../model/http.response.model';

let _prefix = "/user-job"

@Injectable({
  providedIn: 'root'
})
export class UserJobService {

  constructor(
    private http: HttpClient
  ) { }

  getUser(status: string, params: any) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/${status}`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
}
