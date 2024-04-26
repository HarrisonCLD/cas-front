import { Injectable, inject } from '@angular/core';

// interfaces :
import { DataService } from '../interfaces/dataservice.interface';
import { Service } from '../interfaces/service.interface';

// services :
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  private service: DataService = inject(ApiService);

  public serviceSelected!: Service;
  public listServices!: Service[];
  public userServices!: Service[];

  constructor() {
    this.getServices();
  }

  public async getService(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.service.get('/services', id).subscribe((res: any) => {
        this.serviceSelected = res.data.slice();
        resolve(this.serviceSelected);
      });
    });
  }

  public async getServices(): Promise<any> {
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

  private updateService() {}

  private deleteService() {}

  private createService() {}

  setUserToService(data: any) {}

  setStatusToService(id: number, data: any): Promise<any> {
    return new Promise((resolve) => {
      this.service.patch('/services/status', data).subscribe((res: any) => {
        let result: number;
        res.data === 0 ? (result = 0) : (result = 1);
        resolve(result);
      });
    });
  }

  getUserServices(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.service
        .get('/services/administration/user/service', id)
        .subscribe((res: any) => (this.userServices = res.data.slice()));
      resolve(this.userServices);
    });
  }

  deleteUserToService(id: number): void {
    this.service
      .delete('/services/administration/user/service', null)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
