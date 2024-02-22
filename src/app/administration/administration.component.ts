import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StatistiquesService } from '../services/statistiques.service';

import { PopupValidateComponent } from './popup-validate/popup-validate.component';
import { PopupErrorComponent } from './popup-error/popup-error.component';

@Component({
  selector: 'administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit {
  private statService = inject(StatistiquesService);

  public dataServices: any;
  public listServices: any;

  public serviceName!: string;

  public durationInSeconds: number = 40;

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
      this.dataServices = res.data;

      this.dataServices.map((row: any) => {
        row.isDev === 1 ? (row.isDev = true) : (row.isDev = false);
        row.isEnded === 1 ? (row.isEnded = true) : (row.isEnded = false);
      });

      this.listServices = this.dataServices.slice();
    });
  }

  get_searchChange(event: any) {
    this.listServices = this.dataServices.filter((el: any) => {
      return el.name.startsWith(event.target.value);
    });
    this.serviceName = event.target.value;
  }

  resetSearch() {
    this.serviceName = '';
    this.listServices = this.dataServices.slice();
  }

  getActionsForm(service: any): FormGroup {
    return this._formBuilder.group({
      isDev: service.isDev,
      isEnded: service.isEnded,
    });
  }

  openValidateSnackBar() {
    this._snackBar.openFromComponent(PopupValidateComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  
  openErrorSnackBar() {
    this._snackBar.openFromComponent(PopupErrorComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  validateChange(serviceId: number, actionsValue: any) {
    actionsValue.id = serviceId;
    this.statService.set_server_status(actionsValue).subscribe((res) => {
      res.data > 0 ? this.openValidateSnackBar() : this.openErrorSnackBar();
    });
  }
}
