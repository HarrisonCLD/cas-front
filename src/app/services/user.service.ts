import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

// .env :
import { environment } from '../../environments/environment.development';

// services :
import { ApiService } from './api.service';

// interfaces :
import { DataService } from '../interfaces/dataservice.interface';
import { User } from '../interfaces/user.interface';
import { uid } from 'chart.js/dist/helpers/helpers.core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private service: DataService = inject(ApiService);

  public userJWT!: string;

  public currentUser = {
    uid: '',
    isAdmin: false,
  };

  public user: User = {
    id: 0,
    uid: '',
    nom: '',
    groups: [],
    services: [],
    isAdmin: false,
  };

  public users: User[] = [];

  constructor() {}

  getUser(): Promise<User | number> {
    let params: any = {
      id: this.user.uid,
    };
    return new Promise((resolve) => {
      this.service.get(`/auth/user`, params).subscribe((res: any) => {
        if (res.code !== 0) {
          resolve(1);
        } else {
          this.user = {
            ...this.user,
            id: res.data.id,
            services: res.data.services.slice(),
            groups: res.data.groups.slice(),
          };
          this.user.services.sort((a: any, b: any) => {
            if (a.isAdmin !== b.isAdmin) {
              return b.isAdmin - a.isAdmin;
            }
            return a.fqdn.localeCompare(b.fqdn);
          });
          resolve(this.user);
        }
      });
    });
  }

  getUsers(): Promise<any> {
    let params: any = {
      id: this.user.nom,
    };
    return new Promise((resolve) => {
      this.service.get(`/auth/user/list`, params).subscribe((res: any) => {
        if (res.code === 0) {
          this.users = res.data.slice();
        }
        resolve(this.users);
      });
    });
  }

  getProfile(): Promise<any> {
    return new Promise((resolve) => {
      this.service.getAll(`/auth/profile`).subscribe((res: any) => {
        this.currentUser = {
          uid: res.data.login,
          isAdmin: res.data.isAdmin === 1,
        };
        resolve(this.currentUser);
      });
    });
  }
}
