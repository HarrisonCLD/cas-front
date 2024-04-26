import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

// .env :
import { environment } from '../../environments/environment.development';

// services :
import { ApiService } from './api.service';

// interfaces :
import { DataService } from '../interfaces/dataservice.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private service: DataService = inject(ApiService);

  public user!: any;
  public users!: any[];

  public userServices!: any[];
  public userGroups!: any[];
  public userAdminServices!: any[];

  constructor() {}

  getUser(name: string): Promise<any> {
    return new Promise((resolve) => {
      this.service.get(`/auth/user/private`, name).subscribe((res: any) => {
        this.userServices = res.data.services.slice();
        this.userGroups = res.data.groups.slice();
        resolve({ services: this.userServices, groups: this.userGroups });
      });
    });
  }

  getUsers(name: string): Promise<any> {
    return new Promise((resolve) => {
      this.service.get(`/auth/user`, name).subscribe((res: any) => {
        this.users = res.data.slice();
        resolve(this.users);
      });
    });
  }

  createUser(data: any) {
    return new Promise((resolve) => {
      this.service.post(`/user`, data).subscribe((res: any) => {
        console.log('user', res);
        resolve(res);
      });
    });
  }

  updateUser() {}

  deleteUser() {}
}
