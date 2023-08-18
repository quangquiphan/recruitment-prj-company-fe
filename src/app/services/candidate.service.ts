import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import HttpResponse from '../model/http.response.model';
import { Observable, map } from 'rxjs';

let _prefix = "/candidate"

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCandidate(params: any) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}`, {params}).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  getCandidate(id: string) : Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}/${id}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }

  downloadPDF(id: string): Observable<Blob> {
    return this.http.get<Blob>(`${_prefix}/download/${id}`, {responseType: 'blob' as 'json'});
  }
}
