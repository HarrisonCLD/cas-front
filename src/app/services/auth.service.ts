import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class LDAPService {
  constructor(private http: HttpClient) {}

  get_user(user: object): Observable<any> {
    const url = `${environment.apiUrl}/auth/user`;
    return this.http.post(url, user);
  }
  set_user(user: object): Observable<any> {
    const url = `${environment.apiUrl}/auth/user/add`;
    return this.http.post(url, user);
  }
  check_user(user: object): Observable<any> {
    const url = `${environment.apiUrl}/auth/user/check`;
    return this.http.post(url, user);
  }
}
