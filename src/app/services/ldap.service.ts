import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LDAPService {
  constructor(private http: HttpClient) {}

  get_user(user: object): Observable<any> {
    const url = this.http.get(`${environment.apiUrl}/auth/user`);
    return url;
  }
}
