import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import HttpResponse from '../model/http.response.model';

let _prefix = "/company";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  getCompany(id: string) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  updateCompany(id: string, params: any) : Observable<HttpResponse> {
    return this.http.put<HttpResponse>(`${_prefix}/${id}`, params).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
  
  uploadAvatar(id: string, file: File):Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('avatar', file);

    const req = new HttpRequest('PUT', `${_prefix}/upload-avatar/${id}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });    

    return this.http.request(req);
  }
}
