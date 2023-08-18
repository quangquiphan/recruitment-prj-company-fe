import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import HttpResponse from '../model/http.response.model';

let _prefix = "/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUser(id: string): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  updateUser(id: string, params: any): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(`${_prefix}/${id}`, params).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  deleteUser(id: string): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  getCompanyMember(params: any): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/member`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  addMember(params: any): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${_prefix}/member`, params).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  updateMember(id: string, params: any): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(`${_prefix}/member/${id}`, params).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
  
  uploadAvatar(id: string, file: File):Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('PUT', `${_prefix}/upload-avatar/${id}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });    

    return this.http.request(req);
  }
  
  uploadCV(id: string, file: File):Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('PUT', `${_prefix}/upload-cv/${id}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });    

    return this.http.request(req);
  }
}
