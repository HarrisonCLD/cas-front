import { Observable } from 'rxjs';

export interface DataService {
  get(
    path: string,
    paramsObj: { [key: string]: string | number }
  ): Observable<any>;
  getAll(path: string): Observable<any>;
  post(path: string, data: any): Observable<any>;
  delete(path: string, params: any | null): Observable<any>;
  patch(path: string, data: any): Observable<any>;
}
