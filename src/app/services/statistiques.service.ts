import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// .env :
import { environment } from '../../environments/environment.development';

// services :
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StatistiquesService {
//   private service = inject(ApiService);

//   public initialCreationDate!: { datedebut: Date; datefin: Date };
//   public date!: { datedebut: Date; datefin: Date };

//   public dateChanged: Subject<any> = new Subject();

//   public scoreboardChart!: any;

//   constructor(private http: HttpClient) {
//     // default date :
//     const generateDebut = new Date();
//     generateDebut.setDate(1);
//     const generateFin = new Date(
//       generateDebut.getFullYear(),
//       generateDebut.getMonth() + 1,
//       0
//     );
//     this.date = {
//       datedebut: generateDebut,
//       datefin: generateFin,
//     };
//   }

//   // HELPER
//   set_format_date(date: Date): string {
//     let annee = date.getFullYear();
//     let mois = (date.getMonth() + 1).toString().padStart(2, '0');
//     let jour = date.getDate().toString().padStart(2, '0');

//     return annee + '-' + mois + '-' + jour;
//   }

//   // GETTER
//   get_initial_date() {
//     const url = this.http.get(`${environment.apiUrl}/services/initialdate`);
//     return url;
//   }

//   get_last_update() {
//     const url = this.http.get(`${environment.apiUrl}/services/lastupdate`);
//     return url;
//   }

//   get_access() {
//     const url = this.http.get(`${environment.apiUrl}/services/access`);
//     return url;
//   }

//   get_total_access() {
//     const url = this.http.get(`${environment.apiUrl}/services/totalaccess`);
//     return url;
//   }

//   get_success_access() {
//     const url = this.http.get(`${environment.apiUrl}/services/success`);
//     return url;
//   }

//   get_error_access() {
//     const url = this.http.get(`${environment.apiUrl}/services/error`);
//     return url;
//   }

//   get_resume_access(): Observable<any> {
//     const url = this.http.get(`${environment.apiUrl}/services/resume/access`);
//     return url;
//   }

//   get_resume_access_detail(usertype: string): Observable<any> {
//     let params = new HttpParams();
//     params = params.set('usertype', usertype);
//     const url = this.http.get(
//       `${environment.apiUrl}/services/resume/access/detail`,
//       { params }
//     );
//     return url;
//   }

//   get_access_service(id: number): Observable<any> {
//     let params = new HttpParams();
//     params = params.set('id', id);
//     params = params.set('datedebut', this.set_format_date(this.date.datedebut));
//     params = params.set('datefin', this.set_format_date(this.date.datefin));
//     const url = this.http.get(
//       `${environment.apiUrl}/services/usertype/access`,
//       {
//         params: params,
//       }
//     );
//     return url;
//   }

//   get_scoreboard(): Observable<any> {
//     const url = this.http.get(`${environment.apiUrl}/services/scoreboard`);
//     return url;
//   }

//   get_totaly_scoreboard(): Promise<any> {
//     return new Promise((resolve) => {
//       this.service.getAll('/services/scoreboard/all').subscribe((res: any) => {
//         console.log('res', res);
//         resolve(res.data);
//       });
//     });
//   }
}
