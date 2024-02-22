import { Component, Input, OnInit, inject } from '@angular/core';

import { StatistiquesService } from '../../../services/statistiques.service';
import { PopupErrorComponent } from '../../popup-error/popup-error.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupValidateComponent } from '../../popup-validate/popup-validate.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { CreateGroupComponent } from '../create-group/create-group.component';

@Component({
  selector: 'associate-groupservice',
  templateUrl: './associate-groupservice.component.html',
  styleUrl: './associate-groupservice.component.scss',
})
export class AssociateGroupserviceComponent implements OnInit {
  private statService = inject(StatistiquesService);
  public durationInSeconds: number = 40;

  @Input() associateTo!: number;

  public associateServices: Array<any> = [];

  public groupServicesData!: any;
  public groupeServices!: any;

  public listgroup!: any;

  public listservicesData!: any;
  public listservices!: any;

  constructor(private _snackBar: MatSnackBar, private route: ActivatedRoute) {}

  changeGroupe(event: any) {
    const id = event;
    const filterGroup = this.groupServicesData.filter((row: any) => {
      return row.id === id;
    });
    this.groupeServices = filterGroup;
    if (this.groupeServices.length > 0) {
      const filterListServices = this.listservicesData.filter(
        (x: any) => !this.groupeServices[0].services.includes(x.name)
      );
      this.listservices = filterListServices;
    } else {
      this.listservices = this.listservicesData;
    }
  }

  ngOnInit() {
    this.statService.get_groupe().subscribe((res) => {
      this.listgroup = res.data.slice();
    });
    this.statService.get_services().subscribe((res) => {
      this.listservicesData = res.data.slice();

      this.statService.get_groupe_service().subscribe((res: any) => {
        this.groupServicesData = res.data.slice();

        if (this.associateTo != undefined) {
          const filterGroup = this.groupServicesData.filter((row: any) => {
            return row.id === this.associateTo;
          });
          this.groupeServices = filterGroup;

          this.listservices = this.listservicesData.filter(
            (x: any) => !this.groupeServices[0].services.includes(x.name)
          );
        } else {
          this.groupeServices = res.data.slice();
          this.listservices = this.listservicesData.slice();
        }
      });
    });
  }

  onCheckboxChange(row: any): void {
    if (row.checked) {
      this.associateServices.push(row.id);
    } else {
      const indexToDelete = this.associateServices.indexOf(row.id);
      if (indexToDelete !== -1) {
        this.associateServices.splice(indexToDelete, 1);
      } else {
      }
    }
  }

  openErrorSnackBar() {
    this._snackBar.openFromComponent(PopupErrorComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  openValidateSnackBar() {
    this._snackBar.openFromComponent(PopupValidateComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  validate_associationGroup() {
    this.statService
      .set_groupe_service({
        id_groupe: this.associateTo,
        id_service: this.associateServices,
      })
      .subscribe((res) => {
        if (res.data > 0) {
          this.openValidateSnackBar();
          setTimeout(() => {
            location.reload();
          }, 500);
        } else {
          this.openErrorSnackBar();
        }
      });
  }
}
