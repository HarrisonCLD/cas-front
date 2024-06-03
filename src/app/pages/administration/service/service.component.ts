import { Component, OnInit, inject } from '@angular/core';

// material :
import { MatSnackBar } from '@angular/material/snack-bar';

// services :
import { WebService } from '../../../services/webservice.service';

// helpers :
import {
  openValidateSnackBar,
  openErrorSnackBar,
} from '../../../helpers/popup.helper';

@Component({
  selector: 'service-user',
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent implements OnInit {
  private webService = inject(WebService);

  // search input service name :
  public serviceName!: string;

  // list of services :
  public filteredListServices!: any[];

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.webService
      .getServices()
      .then((res: any) => (this.filteredListServices = res.slice()));
  }

  get_searchChange(event: any) {
    this.serviceName = event.target.value;
    this.filteredListServices = this.webService.listServices.filter(
      (el: any) => {
        return el.name.startsWith(this.serviceName);
      }
    );
  }

  clear_search() {
    this.serviceName = '';
    this.filteredListServices = this.webService.listServices.slice();
  }

  toggleIsDev(service: any) {
    service.isDev = !service.isDev;
  }

  toggleIsEnded(service: any) {
    service.isEnded = !service.isEnded;
  }

  validateChange(formValue: any) {
    this.webService
      .setStatusToService(formValue.id, formValue)
      .then((res: any) =>
        res === 1
          ? openValidateSnackBar(this._snackBar)
          : openErrorSnackBar(this._snackBar)
      );
  }
}
