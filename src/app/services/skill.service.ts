import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import HttpResponse from '../model/http.response.model';

let _prefix = "/skill"

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(
    private http: HttpClient
  ) { }

  addSkill(params: any) : Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${_prefix}`, params).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  getSkills() : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  getSkill(id: string) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  getPageSkills(params: any) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/pages`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  searchSkill(params: any) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/search`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  updateSkill(id: string, params: any) : Observable<HttpResponse> {
    return this.http.put<HttpResponse>(`${_prefix}/${id}`, params).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  deleteSkill(id: string) : Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
}
