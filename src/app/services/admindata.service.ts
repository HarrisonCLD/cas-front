import { Injectable, inject } from '@angular/core';

// services :
import { ApiService } from './api.service';

// interfaces :
import { DataService } from '../interfaces/dataservice.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminDataService {
  private service: DataService = inject(ApiService);

  // multiple array for different data :
  public listService: any[] = [];
  public listGroup: any[] = [];
  public groupService: any[] = [];

  constructor() {}

  getServices() {
    this.service.getAll('/services/list').subscribe((res: any) => {
      if (res.code !== 0) return;
      this.listService = res.data.slice();
      this.getGroupsServices();
    });
  }

  getGroupsServices() {
    this.listGroup = [];
    this.service
      .getAll('/services/administration/groupe/service')
      .subscribe((res: any) => {
        this.groupService = res.data.slice();

        this.groupService.map((row: any) => {
          this.listGroup.push({ id_service: row.id, label: row.label });
        });

        this.groupService.map((row: any) => {
          row.services.sort((a: any, b: any) => {
            if (a.isAdmin != null && b.isAdmin != null) {
              if (a.isAdmin !== b.isAdmin) return b.isAdmin - a.isAdmin;
            }
            if (typeof a.fqdn === 'string' && typeof b.fqdn === 'string')
              return a.fqdn.localeCompare(b.fqdn);

            return 0;
          });
        });
      });
  }
}
