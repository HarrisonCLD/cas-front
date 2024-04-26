import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// interfaces :
import { DataService } from '../interfaces/dataservice.interface';

// .env :
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements DataService {
  constructor(private http: HttpClient) {}

  get(path: string, id: string | number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(`${environment.apiUrl}${path}`, { params: params });
  }

  getAll(path: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`);
  }

  post(path: string, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${path}`, data);
  }

  delete(path: string, params?: any): Observable<any> {
    const url = `${environment.apiUrl}${path}`;
    const options = params
      ? { params: new HttpParams({ fromObject: params }) }
      : {};
    return this.http.delete(url, options);
  }

  patch(path: string, data: any): Observable<any> {
    return this.http.patch(`${environment.apiUrl}${path}`, data);
  }
}
