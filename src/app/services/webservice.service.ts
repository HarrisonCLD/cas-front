import { Injectable, inject } from '@angular/core';

// interfaces :
import { DataService } from '../interfaces/dataservice.interface';
import { Service } from '../interfaces/service.interface';
import {
  Access,
  ResumeAccess,
  ResumeAccessDetails,
} from '../interfaces/statsaccess.interface';

// services :
import { ApiService } from './api.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  private service: DataService = inject(ApiService);

  public date!: { datedebut: Date; datefin: Date };
  public initialCreationDate!: { datedebut: Date; datefin: Date };

  public suggestedMaxChart: number = 10;
  public serviceSelectedAccess!: Service;
  public serviceSelectedUnique!: Service;

  public accessService: Access = {
    unique: 0,
    access: 0,
    error: 0,
    success: 0,
  };

  public resumeAccess: ResumeAccess[] = [];
  public resumeAccessDetails: ResumeAccessDetails[] = [];

  public listServices: Service[] = [];
  public associateUserToServices: Array<number> = [];
  public associateAdminUserToServices: Array<number> = [];

  public dateChanged: Subject<any> = new Subject();
  public scoreboardChart!: any;

  constructor(private http: HttpClient) {
    this.getServices();

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
    this.initialCreationDate = {
      datedebut: generateDebut,
      datefin: generateFin,
    };
  }

  set_format_date(date: Date): string {
    let annee = date.getFullYear();
    let mois = (date.getMonth() + 1).toString().padStart(2, '0');
    let jour = date.getDate().toString().padStart(2, '0');

    return annee + '-' + mois + '-' + jour;
  }

  get_initial_date() {
    return new Promise((resolve) => {
      this.service.getAll('/services/initialdate').subscribe((res: any) => {
        if (res.code !== 0) return;
        this.initialCreationDate = {
          datedebut: res.data.datedebut,
          datefin: res.data.datefin,
        };
        resolve(this.initialCreationDate);
      });
    });
  }

  get_last_update() {
    return new Promise((resolve) => {
      this.service.getAll('/services/lastupdate').subscribe((res: any) => {
        if (res.code !== 0) return;
        resolve(res.data);
      });
    });
  }

  get_access() {
    return new Promise((resolve) => {
      this.service.getAll('/services/accesslogs').subscribe((res: any) => {
        if (res.code !== 0) return;
        this.accessService = res.data;
        resolve(this.accessService);
      });
    });
  }

  get_total_access() {
    return new Promise((resolve) => {
      this.service.getAll('/services/totalaccess').subscribe((res: any) => {
        if (res.code !== 0) return;
        resolve(res.data[0]);
      });
    });
  }

  get_success_access(): Promise<any> {
    return new Promise((resolve) => {
      this.service.getAll('/services/success').subscribe((res: any) => {
        if (res.code !== 0) return;
        resolve(res.data[0]);
      });
    });
  }

  get_error_access(): Promise<any> {
    return new Promise((resolve) => {
      this.service.getAll('/services/error').subscribe((res: any) => {
        if (res.code !== 0) return;
        resolve(res.data[0]);
      });
    });
  }

  get_resume_access(): Promise<any> {
    return new Promise((resolve) => {
      this.service.getAll('/services/access').subscribe((res: any) => {
        let result: number;
        if (res.code !== 0) {
          result = 1;
        } else {
          this.resumeAccess = res.data.slice();
          result = 0;
        }
        resolve(result);
      });
    });
  }

  get_resume_access_detail(usertype: string): Promise<any> {
    const params = {
      id: usertype,
    };
    return new Promise((resolve) => {
      this.service
        .get('/services/access/detail', params)
        .subscribe((res: any) => {
          this.resumeAccessDetails = [];
          let result: number;
          if (res.code !== 0) {
            result = 1;
          } else {
            this.resumeAccessDetails = res.data.slice();
            result = 0;
          }
          resolve(result);
        });
    });
  }

  get_access_service(): Promise<any> {
    const params = {
      id: this.serviceSelectedAccess.id,
      datedebut: this.set_format_date(new Date(this.date.datedebut)),
      datefin: this.set_format_date(new Date(this.date.datefin)),
    };
    return new Promise((resolve) => {
      this.service
        .get('/services/access/global', params)
        .subscribe((res: any) => {
          let result: number;
          if (res.code !== 0) {
            result = 1;
          } else {
            const total = (res.data.datasets || [])
              .flatMap((row: any) => row.data)
              .reduce((acc: any, curr: any) => acc + curr, 0);
            this.serviceSelectedAccess = {
              ...this.serviceSelectedAccess,
              title: 'global',
              name: res.data.name,
              active: res.data.active === 1 ? false : true,
              isDev: res.data.isDev === 0 ? false : true,
              isEnded: res.data.isEnded === 0 ? false : true,
              admin: res.data.admin,
              datasets: res.data.datasets,
              labels: res.data.labels,
              moyenne: res.data.moyenne.toLocaleString('fr-FR'),
              peak: res.data.peak.toLocaleString('fr-FR'),
              total: total.toLocaleString('fr-FR'),
            };
            let max: number = 0;
            if (res.data.peak < 10) {
              max = 10;
            } else if (res.data.peak > 10 && res.data.peak < 50) {
              max = 50;
            } else if (res.data.peak > 50 && res.data.peak < 100) {
              max = 100;
            } else if (res.data.peak > 100 && res.data.peak < 250) {
              max = 250;
            } else if (res.data.peak > 250 && res.data.peak < 500) {
              max = 500;
            } else if (res.data.peak > 500 && res.data.peak < 1000) {
              max = 1000;
            } else if (res.data.peak > 1000 && res.data.peak < 2500) {
              max = 2500;
            } else if (res.data.peak > 2500 && res.data.peak < 5000) {
              max = 5000;
            } else if (res.data.peak > 5000 && res.data.peak < 10000) {
              max = 10000;
            } else if (res.data.peak > 10000 && res.data.peak < 25000) {
              max = 25000;
            } else if (res.data.peak > 25000 && res.data.peak < 50000) {
              max = 50000;
            } else if (res.data.peak > 50000 && res.data.peak < 75000) {
              max = 75000;
            } else if (res.data.peak > 75000 && res.data.peak < 100000) {
              max = 100000;
            }
            this.suggestedMaxChart = max;
            result = 0;
          }
          resolve(result);
        });
    });
  }

  get_unique_access_service(): Promise<any> {
    const params = {
      id: this.serviceSelectedAccess.id,
      datedebut: this.set_format_date(new Date(this.date.datedebut)),
      datefin: this.set_format_date(new Date(this.date.datefin)),
    };
    return new Promise((resolve) => {
      this.service
        .get('/services/access/unique', params)
        .subscribe((res: any) => {
          let result: number;
          if (res.code !== 0) {
            result = 1;
          } else {
            const total = (res.data.datasets || [])
              .flatMap((row: any) => row.data)
              .reduce((acc: any, curr: any) => acc + curr, 0);
            this.serviceSelectedUnique = {
              ...this.serviceSelectedUnique,
              title: 'unique',
              name: res.data.name,
              active: res.data.active === 1 ? false : true,
              isDev: res.data.isDev === 0 ? false : true,
              isEnded: res.data.isEnded === 0 ? false : true,
              admin: res.data.admin,
              datasets: res.data.datasets,
              labels: res.data.labels,
              moyenne: res.data.moyenne.toLocaleString('fr-FR'),
              peak: res.data.peak.toLocaleString('fr-FR'),
              total: total.toLocaleString('fr-FR'),
            };
            result = 0;
          }
          resolve(result);
        });
    });
  }

  get_scoreboard(): Promise<any> {
    return new Promise((resolve) => {
      this.service.getAll('/services/scoreboard').subscribe((res: any) => {
        if (res.code !== 0) return;
        resolve(res.data);
      });
    });
  }

  get_totaly_scoreboard(): Promise<any> {
    return new Promise((resolve) => {
      this.service.getAll('/services/all').subscribe((res: any) => {
        if (res.code !== 0) return;
        resolve(res.data);
      });
    });
  }

  getService(): Promise<any> {
    let params = {
      id: this.serviceSelectedAccess.id,
    };
    return new Promise((resolve) => {
      this.service.get('/services', params).subscribe((res: any) => {
        this.serviceSelectedAccess = res.data[0];
        resolve(this.serviceSelectedAccess);
      });
    });
  }

  getServices(): Promise<any> {
    return new Promise((resolve) => {
      this.service.getAll('/services/list').subscribe((res: any) => {
        this.listServices = res.data.slice();
        this.listServices.map((row: any) => {
          row.isDev === 1 ? (row.isDev = true) : (row.isDev = false);
          row.isEnded === 1 ? (row.isEnded = true) : (row.isEnded = false);
        });
        resolve(this.listServices);
      });
    });
  }

  setStatusToService(id: number, data: any): Promise<any> {
    return new Promise((resolve) => {
      this.service.patch('/services/status', data).subscribe((res: any) => {
        let result: number;
        res.data === 0 ? (result = 0) : (result = 1);
        resolve(result);
      });
    });
  }

  setUserToService(data: any) {
    return new Promise((resolve) => {
      this.service.post('/services/user', data).subscribe((res: any) => {
        let result: number;
        res.code === 0 ? (result = 0) : (result = 1);
        resolve(result);
      });
    });
  }

  deleteUserToService(data: any): Promise<any> {
    let params: any = {
      id_user: data.id_user,
      id_service: data.id_service,
    };
    return new Promise((resolve) => {
      this.service.delete(`/services/user`, params).subscribe((res: any) => {
        let result: number;
        res.code === 0 ? (result = 0) : (result = 1);
        resolve(result);
      });
    });
  }

  setAdminUserToService(data: any): Promise<number> {
    return new Promise((resolve) => {
      this.service.post(`/services/admin`, data).subscribe((res: any) => {
        let result: number;
        res.code === 0 ? (result = 0) : (result = 1);
        resolve(result);
      });
    });
  }

  deleteAdminUserFromService(data: any): Promise<number> {
    return new Promise((resolve) => {
      this.service.patch(`/services/admin`, data).subscribe((res: any) => {
        let result: number;
        res.code === 0 ? (result = 0) : (result = 1);
        resolve(result);
      });
    });
  }
}
