import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatistiquesService {
  public date!: { datedebut: Date; datefin: Date };

  public dateChanged: Subject<any> = new Subject();

  constructor(private http: HttpClient) {
    // default date :
    const generateDebut = new Date();
    generateDebut.setDate(1);
    const generateFin = new Date(
      generateDebut.getFullYear(),
      generateDebut.getMonth() + 1,
      0
    );
    this.date = {
      datedebut: generateDebut,
      datefin: generateFin,
    };
  }

  // HELPER
  set_format_date(date: Date): string {
    let annee = date.getFullYear();
    let mois = (date.getMonth() + 1).toString().padStart(2, '0');
    let jour = date.getDate().toString().padStart(2, '0');

    return annee + '-' + mois + '-' + jour;
  }

  // GETTER
  get_access() {
    const url = this.http.get(`${environment.apiUrl}/services/access`);
    return url;
  }

  get_total_access() {
    const url = this.http.get(`${environment.apiUrl}/services/totalaccess`);
    return url;
  }

  get_success_access() {
    const url = this.http.get(`${environment.apiUrl}/services/success`);
    return url;
  }

  get_error_access() {
    const url = this.http.get(`${environment.apiUrl}/services/error`);
    return url;
  }

  get_resume_access(): Observable<any> {
    const url = this.http.get(`${environment.apiUrl}/services/resume/access`);
    return url;
  }

  get_resume_access_detail(usertype: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('usertype', usertype);
    const url = this.http.get(
      `${environment.apiUrl}/services/resume/access/detail`,
      { params }
    );
    return url;
  }

  get_service(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('id', id);
    const url = this.http.get(`${environment.apiUrl}/services/one`, {
      params: params,
    });
    return url;
  }

  get_services(): Observable<any> {
    const url = this.http.get(`${environment.apiUrl}/services/list`);
    return url;
  }

  get_access_service(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('id', id);
    params = params.set('datedebut', this.set_format_date(this.date.datedebut));
    params = params.set('datefin', this.set_format_date(this.date.datefin));
    const url = this.http.get(
      `${environment.apiUrl}/services/usertype/access`,
      {
        params: params,
      }
    );
    return url;
  }

  get_scoreboard(): Observable<any> {
    const url = this.http.get(`${environment.apiUrl}/services/scoreboard`);
    return url;
  }

  get_totaly_scoreboard(): Observable<any> {
    const url = this.http.get(`${environment.apiUrl}/services/scoreboard/all`);
    return url;
  }

  get_groupe(): Observable<any> {
    const url = this.http.get(
      `${environment.apiUrl}/services/administration/groupe`
    );
    return url;
  }

  get_groupe_service(): Observable<any> {
    const url = this.http.get(
      `${environment.apiUrl}/services/administration/groupe/service`
    );
    return url;
  }

  get_service_user(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('id', id);
    const url = this.http.get(
      `${environment.apiUrl}/services/administration/user/service`,
      { params: params }
    );
    return url;
  }

  get_groupe_user(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('id', id);
    const url = this.http.get(
      `${environment.apiUrl}/services/administration/user/groupe`,
      { params: params }
    );
    return url;
  }

  get_user_admin_service(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('id', id);
    const url = this.http.get(
      `${environment.apiUrl}/services/administration/user/service/admin`,
      { params: params }
    );
    return url;
  }

  get_infos_user(uid: string) {
    let params = new HttpParams();
    params = params.set('uid', uid);
    const url = this.http.get(`${environment.apiUrl}/auth/user/info`, {
      params: params,
    });
    return url;
  }

  // SETTER
  set_groupe(body: any): Observable<any> {
    const url = `${environment.apiUrl}/services/administration/groupe`;
    return this.http.post(url, body);
  }
  set_groupe_service(body: any): Observable<any> {
    const url = `${environment.apiUrl}/services/administration/groupe/service`;
    return this.http.post(url, body);
  }
  set_server_status(body: any): Observable<any> {
    const url = `${environment.apiUrl}/services/administration/server/status`;
    return this.http.patch(url, body);
  }
  set_delete_label_group(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('id', id);
    const url = this.http.delete(
      `${environment.apiUrl}/services/administration/groupe/label`,
      { params }
    );
    return url;
  }
  set_edit_label_group(body: object): Observable<any> {
    const url = `${environment.apiUrl}/services/administration/groupe/label`;
    return this.http.patch(url, body);
  }
  set_service_to_user(body: object): Observable<any> {
    const url = `${environment.apiUrl}/services/administration/user/service`;
    return this.http.post(url, body);
  }
  set_group_to_user(body: object): Observable<any> {
    const url = `${environment.apiUrl}/services/administration/user/groupe`;
    return this.http.post(url, body);
  }
  set_user_admin_service(body: object): Observable<any> {
    const url = `${environment.apiUrl}/services/administration/user/service/admin`;
    return this.http.post(url, body);
  }

  // DELETE
  delete_service_to_user(body: object): Observable<any> {
    const url = `${environment.apiUrl}/services/administration/user/service`;
    return this.http.patch(url, body);
  }
  delete_group_to_user(body: object): Observable<any> {
    const url = `${environment.apiUrl}/services/administration/user/groupe`;
    return this.http.patch(url, body);
  }
  delete_admin_to_user(body: object): Observable<any> {
    const url = `${environment.apiUrl}/services/administration/user/service/admin`;
    return this.http.patch(url, body);
  }
  delete_service_to_group(body: object): Observable<any> {
    const url = `${environment.apiUrl}/services/administration/groupe/service`;
    return this.http.patch(url, body);
  }
}
