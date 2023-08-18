import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import HttpResponse from '../model/http.response.model';
import { Observable, map } from 'rxjs';

let _prefix ="/language";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private http: HttpClient
  ) { }

  getAllLang(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${_prefix}`).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }
}
