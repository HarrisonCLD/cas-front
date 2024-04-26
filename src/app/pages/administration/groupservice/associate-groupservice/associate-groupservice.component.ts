import { Component, Input, OnInit, inject } from '@angular/core';

// material :
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

// helpers :
import {
  openValidateSnackBar,
  openErrorSnackBar,
} from '../../../../helpers/popup.helper';

// services :
import { WebService } from '../../../../services/webservice.service';
import { GroupeWebService } from '../../../../services/groupewebservice.service';

// components :
import { DialogComponent } from '../../../../components/shared/dialog-component/dialog-component.component';

@Component({
  selector: 'associate-groupservice',
  templateUrl: './associate-groupservice.component.html',
  styleUrl: './associate-groupservice.component.scss',
})
export class AssociateGroupserviceComponent implements OnInit {
  public groupsWebServices = inject(GroupeWebService);
  private webServices = inject(WebService);

  @Input() public idGroupForAssociation!: number | undefined;
  public associationGroupsServices: any[] = [];

  public serviceName: string = '';

  public listGroups!: any[];
  public filteredListGroupsServices!: any[];
  public filteredListServices!: any[];
  public backupListServices!: any[];

  public allChecked: boolean = false;

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit() {
    this.recoverServices();
    this.recoverGroups();
  }

  private recoverServices(): void {
    this.filteredListServices = this.webServices.listServices.slice();
  }
  private recoverGroups(): void {
    this.listGroups = this.groupsWebServices.listGroups.slice();
    this.filteredListGroupsServices = this.listGroups.slice();
  }

  changeGroupe(event: any) {
    this.recoverServices();
    this.recoverGroups();

    this.idGroupForAssociation = event;

    let index = this.filteredListGroupsServices.findIndex((row: any) => {
      return row.id === this.idGroupForAssociation;
    });
    if (index === -1) return;

    this.filteredListServices = this.filteredListServices.filter((row: any) => {
      return !this.filteredListGroupsServices[index].services.some(
        (line: any) => row.id === line.id_service
      );
    });

    this.filteredListGroupsServices = [this.listGroups[index]];

    this.filteredListServices.forEach(
      (service: any) => (service.checked = false)
    );
    this.backupListServices = this.filteredListServices;
  }

  searchService(event: any) {
    this.filteredListServices = this.backupListServices.filter((row: any) => {
      return row.name.startsWith(event.target.value);
    });
  }
  clearSearchService() {
    this.serviceName = '';
    this.recoverServices();
  }

  openDialogDelete(data: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: 'Êtes-vous sûr de vouloir supprimer le service de ce groupe ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 0) return;
      this.groupsWebServices.deleteServiceToGroup(data).then((res: any) => {
        if (res !== 0) {
          openErrorSnackBar(this._snackBar);
        } else {
          openValidateSnackBar(this._snackBar);
          let index = this.filteredListGroupsServices.findIndex(
            (row: any) => row.id === data.id_groupe
          );
          let indexToDelete = this.filteredListGroupsServices[
            index
          ].services.findIndex(
            (row: any) => row.id_service === data.id_service
          );
          this.filteredListGroupsServices[index].services.splice(
            indexToDelete,
            1
          );
          this.changeGroupe(this.idGroupForAssociation);
        }
      });
    });
  }

  selectAllServices(event: any): void {
    const isChecked = event.target.checked;
    this.allChecked = isChecked;
    this.filteredListServices.forEach((row: any) => (row.checked = isChecked));
    this.associationGroupsServices = isChecked
      ? [...this.filteredListServices]
      : [];
  }

  onCheckboxChange(row: any): void {
    if (row.checked) {
      this.associationGroupsServices.push(row.id);
    } else {
      const indexToDelete = this.associationGroupsServices.indexOf(row.id);
      if (indexToDelete !== -1)
        this.associationGroupsServices.splice(indexToDelete, 1);
      this.allChecked = false;
    }
  }

  validate_associationGroup() {
    this.groupsWebServices
      .setServiceToGroup({
        id_groupe: this.idGroupForAssociation,
        id_service: this.associationGroupsServices,
      })
      .then((res: any) => {
        if (res !== 0) {
          openErrorSnackBar(this._snackBar);
        } else {
          openValidateSnackBar(this._snackBar);
          this.groupsWebServices.getGroups().then(() => this.recoverGroups());
        }
      });
    this.filteredListServices.forEach(
      (service: any) => (service.checked = false)
    );
    this.serviceName = '';
    this.idGroupForAssociation = undefined;
    this.associationGroupsServices = [];
  }
}
