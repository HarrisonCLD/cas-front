import { Injectable, inject } from '@angular/core';

// interfaces :
import { DataService } from '../interfaces/dataservice.interface';
import { GroupService } from '../interfaces/groupewebservice.interface';

// services :
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class GroupeWebService {
  private service: DataService = inject(ApiService);

  public group!: GroupService;
  public listGroups: GroupService[] = [];
  public userGroups!: GroupService[];

  constructor() {
    this.getGroups();
  }

  getGroup() {}

  getGroups(): Promise<any> {
    return new Promise((resolve) => {
      this.service.getAll('/group').subscribe((res: any) => {
        res.data
          ? (this.listGroups = res.data.slice())
          : (this.listGroups = []);
        resolve(this.listGroups);
      });
    });
  }

  createGroup(data: any) {
    return new Promise((resolve) => {
      this.service.post('/group', data).subscribe(async (res: any) => {
        let result: number;
        if (res.code === 0) {
          await this.getGroups();
          result = 0;
        } else {
          result = 1;
        }
        resolve(result);
      });
    });
  }

  updateGroup(id: number, data: any) {
    return new Promise((resolve) => {
      this.service.patch(`/group/${id}`, data).subscribe(async (res: any) => {
        let result: number;
        if (res.code === 0) {
          await this.getGroups();
          result = 0;
        } else {
          result = 1;
        }
        resolve(result);
      });
    });
  }

  deleteGroup(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(`/group/${id}`, null).subscribe(async (res: any) => {
        let result: number;
        if (res.code === 0) {
          await this.getGroups();
          result = 0;
        } else {
          result = 1;
        }
        resolve(result);
      });
    });
  }

  setServiceToGroup(data: any): Promise<number> {
    return new Promise((resolve) => {
      this.service.post('/group/services', data).subscribe((res: any) => {
        let result: number;
        res.code === 0 ? (result = 0) : (result = 1);
        resolve(result);
      });
    });
  }

  deleteServiceToGroup(data: any): Promise<any> {
    let params: any = {
      id_groupe: data.id_groupe,
      id_service: data.id_service,
    };
    return new Promise((resolve) => {
      this.service.delete(`/group/services`, params).subscribe((res: any) => {
        let result: number;
        res.code === 0 ? (result = 0) : (result = 1);
        resolve(result);
      });
    });
  }

  setUserToGroup(data: any) {
    this.service.post('/services/administration/user/groupe', data);
  }

  getUserGroups(id: number) {
    this.service
      .get('/', id)
      .subscribe((res: any) => {
        console.log(res);
        this.userGroups = res.data.slice();
      });
  }
}
