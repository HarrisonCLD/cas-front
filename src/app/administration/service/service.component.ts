import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StatistiquesService } from '../../services/statistiques.service';

import {
  openValidateSnackBar,
  openErrorSnackBar,
} from '../../helpers/popup.helper';

@Component({
  selector: 'service-user',
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent implements OnInit {
  private statService = inject(StatistiquesService);

  // search input service name :
  public serviceName!: string;

  // list of services :
  public listServices: any;
  public filterListServices: any;

  // form group service is in development or stoped :
  actions = this._formBuilder.group({
    isDev: false,
    isEnded: false,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.statService.get_services().subscribe((res) => {
      this.listServices = res.data.slice();

      this.listServices.map((row: any) => {
        row.isDev === 1 ? (row.isDev = true) : (row.isDev = false);
        row.isEnded === 1 ? (row.isEnded = true) : (row.isEnded = false);
      });

      this.filterListServices = this.listServices.slice();
    });
  }

  get_searchChange(event: any) {
    this.filterListServices = this.listServices.filter((el: any) => {
      return el.name.startsWith(event.target.value);
    });
    this.serviceName = event.target.value;
  }

  clear_search() {
    this.serviceName = '';
    this.filterListServices = this.listServices.slice();
  }

  getActionsForm(service: any): FormGroup {
    return this._formBuilder.group({
      isDev: service.isDev,
      isEnded: service.isEnded,
    });
  }

  validateChange(serviceId: number, actionsValue: any) {
    actionsValue.id = serviceId;
    this.statService.set_server_status(actionsValue).subscribe((res) => {
      res.data > 0
        ? openValidateSnackBar(this._snackBar)
        : openErrorSnackBar(this._snackBar);
    });
  }
}
