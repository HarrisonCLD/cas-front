import { Component, Input, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StatistiquesService } from '../../../services/statistiques.service';

import { openValidateSnackBar } from '../../../helpers/popup.helper';
import { openErrorSnackBar } from '../../../helpers/popup.helper';

@Component({
  selector: 'associate-groupservice',
  templateUrl: './associate-groupservice.component.html',
  styleUrl: './associate-groupservice.component.scss',
})
export class AssociateGroupserviceComponent implements OnInit {
  private statService = inject(StatistiquesService);

  // service selected :
  @Input() associateTo!: number | undefined;

  // array for association :
  public associateServices: Array<any> = [];

  // data for search input (id, fqdn) :
  public listgroup: Array<any> = [];

  // data about groups :
  public groupServicesData: Array<any> = [];
  public groupServices: Array<any> = [];

  // data about list of services :
  public serviceName: string = '';
  public listservicesData: Array<any> = [];
  public listservices: Array<any> = [];

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.statService.get_services().subscribe((res) => {
      this.listservicesData = res.data.slice();
      this.get_groupe_service();
    });
  }

  get_searchChange(event: any) {
    this.listservices = this.listservicesData.filter((el: any) => {
      return el.name.startsWith(event.target.value);
    });
    this.serviceName = event.target.value;
  }

  clear_search() {
    this.serviceName = '';
    this.listservices = this.listservicesData.slice();
  }

  changeGroupe(event: any) {
    if (event) {
      const id = event;
      this.associateTo = id;
    }

    if (this.associateTo !== undefined) {
      // filter groups to get the one selected
      const filter = this.groupServicesData.filter((row: any) => {
        return row.id === this.associateTo;
      });

      this.groupServices = filter;

      const ids: Array<number> = [];

      this.groupServices.map((row: any) => {
        row.services.map((line: any) => {
          ids.push(parseInt(line.id_service));
        });
      });

      // filter list to avoid duplicates
      this.listservices = this.listservicesData.filter((row: any) => {
        return !ids.includes(row.id);
      });

      // uncheck all values
      for (let i = 0; i < this.listservices.length; i++) {
        this.listservices[i].checked = false;
      }

      this.associateServices = [];
      console.log(this.associateTo);
    }
  }

  onCheckboxChange(row: any): void {
    if (row.checked) {
      this.associateServices.push(row.id);
    } else {
      const indexToDelete = this.associateServices.indexOf(row.id);
      if (indexToDelete !== -1) {
        this.associateServices.splice(indexToDelete, 1);
      }
    }
  }

  validate_associationGroup() {
    if (this.associateTo !== undefined) {
      this.statService
        .set_groupe_service({
          id_groupe: this.associateTo,
          id_service: this.associateServices,
        })
        .subscribe((res) => {
          if (res.data > 0) {
            openValidateSnackBar(this._snackBar);

            // reset all attributs
            this.associateTo = undefined;
            this.associateServices = [];
            this.get_groupe_service();
          } else {
            openErrorSnackBar(this._snackBar);
          }
        });
    } else {
      openErrorSnackBar(this._snackBar);
    }
  }

  delete(id_groupe: number, id_service: number) {
    // template HTTP request :
    const body = {
      id_groupe: id_groupe,
      id_service: id_service,
    };

    this.statService.delete_service_to_group(body).subscribe((res: any) => {
      if (res.data === 1) {
        openValidateSnackBar(this._snackBar);

        // function to directly delete the group service :
        const indexGroup = this.groupServices.findIndex(
          (row: any) => row.id === body.id_groupe
        );
        if (indexGroup !== -1) {
          const indexToDelete = this.groupServices[
            indexGroup
          ].services.findIndex(
            (row: any) => row.id_service === body.id_service
          );
          if (indexToDelete !== -1) {
            this.groupServices[indexGroup].services.splice(indexToDelete, 1);

            const filterListServices = this.listservicesData.filter(
              (x: any) => {
                return !this.groupServices[0].services.some(
                  (row: any) => row.fqdn === x.name
                );
              }
            );
            this.listservices = filterListServices;
          }
        }
      } else {
        openErrorSnackBar(this._snackBar);
      }
    });
  }

  get_groupe_service() {
    // reset :
    this.listgroup = [];

    // get all groups services :
    this.statService.get_groupe_service().subscribe((res: any) => {
      this.groupServicesData = res.data.slice();
      this.groupServices = this.groupServicesData.slice();

      if (this.associateTo !== undefined) {
        const filter = this.groupServicesData.filter((row: any) => {
          return row.id === this.associateTo;
        });
        this.groupServices = filter;
      }

      // generate the new list group without the duplicate list :
      this.groupServicesData.map((row: any) => {
        this.listgroup.push({ id_service: row.id, label: row.label });
      });

      this.changeGroupe(null);
    });
  }
}
