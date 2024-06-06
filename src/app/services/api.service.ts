import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// interfaces :
import { DataService } from '../interfaces/dataservice.interface';

// .env :
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements DataService {
  public jwt!: string;

  public headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {}

  provisionHeaders(attribut: string, value: string) {
    this.headers = this.headers.set(`${attribut}`, `${value}`);
  }

  get(path: string, params?: any): Observable<any> {
    let options: HttpParams = new HttpParams();
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        options = options.set(`${key}`, `${value}`);
      }
    }
    return this.http
      .get(`${environment.apiUrl}${path}`, {
        params: options,
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          // console.error('HTTP GET Error:', error);
          return of({ code: 1, status: 'error' });
        })
      );
  }

  getAll(path: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}${path}`, { headers: this.headers })
      .pipe(
        catchError((error) => {
          // console.error('HTTP GET ALL Error:', error);
          return of({ code: 1, status: 'error' });
        })
      );
  }

  post(path: string, data: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}${path}`, data, { headers: this.headers })
      .pipe(
        catchError((error) => {
          // console.error('HTTP POST Error:', error);
          return of({ code: 1, status: 'error' });
        })
      );
  }

  delete(path: string, params?: any): Observable<any> {
    let options: HttpParams = new HttpParams();
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        options = options.set(`${key}`, `${value}`);
      }
    }
    return this.http
      .delete(`${environment.apiUrl}${path}`, {
        params: options,
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          // console.error('HTTP DELETE Error:', error);
          return of({ code: 1, status: 'error' });
        })
      );
  }

  patch(path: string, data: any): Observable<any> {
    return this.http
      .patch(`${environment.apiUrl}${path}`, data, { headers: this.headers })
      .pipe(
        catchError((error) => {
          // console.error('HTTP PATCH Error:', error);
          return of({ code: 1, status: 'error' });
        })
      );
  }
}
