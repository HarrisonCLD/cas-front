import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

// angular material :
import { MatSnackBar } from '@angular/material/snack-bar';

// services :
import { UserService } from '../../../services/user.service';
import { WebService } from '../../../services/webservice.service';
import { GroupeWebService } from '../../../services/groupewebservice.service';

// helpers :
import {
  openValidateSnackBar,
  openErrorSnackBar,
} from '../../../helpers/popup.helper';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../../components/shared/dialog-component/dialog-component.component';

interface UIUtilisateur {
  userSelected: boolean;
  actionSelected: 'informations' | 'service' | 'group' | 'admin' | null;
  research: boolean;
}

@Component({
  selector: 'utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.scss',
})
export class UtilisateurComponent implements OnInit, OnDestroy {
  public userService = inject(UserService);
  public webService = inject(WebService);
  public groupWebService = inject(GroupeWebService);

  private searchTerms = new Subject<string>();

  public ui_utilisateur: UIUtilisateur = {
    userSelected: false,
    actionSelected: null,
    research: false,
  };

  // list of services :
  public listServices: Array<any> = [];
  public filteredListServices: Array<any> = [];

  // list of groups :
  public listGroup: Array<any> = [];
  public filteredListGroup: Array<any> = [];

  public listAdmin: Array<any> = [];
  public filteredListAdmin: Array<any> = [];

  public allChecked: boolean = false;

  public errorUserMessage = {
    toggle: false,
    message: '',
  };

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.searchTerms.pipe(debounceTime(250)).subscribe((searchTerm: string) => {
      if (searchTerm.length > 2) {
        this.userService.getUsers().then(() => {
          if (this.userService.users.length < 1) {
            setTimeout(() => {
              this.errorUserMessage.toggle = true;
              this.errorUserMessage.message =
                'Identifiant utilisateur incorrect';
            }, 200);
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.ui_utilisateur = {
      userSelected: false,
      actionSelected: null,
      research: false,
    };
    this.userService.users = [];
    this.userService.user = {
      id: 0,
      uid: '',
      nom: '',
      groups: [],
      services: [],
    };
  }

  refreshData(type: 'service' | 'admin' | 'group') {
    switch (type) {
      case 'service':
        this.listServices = this.webService.listServices.filter((row: any) => {
          return !this.userService.user.services.some(
            (line: any) => row.id === line.id_service
          );
        });
        this.filteredListServices = this.listServices.slice();
        break;
      case 'group':
        this.listGroup = this.groupWebService.listGroups.filter((row: any) => {
          return !this.userService.user.groups.some(
            (line: any) => row.id === line.id_groupe
          );
        });
        this.filteredListGroup = this.listGroup.slice();
        break;
      case 'admin':
        this.userService.getUser().then(() => {
          this.listAdmin = this.webService.listServices.filter((row: any) => {
            return !this.userService.user.services.find((line: any) => {
              return line.id_service === row.id && line.isAdmin === 1;
            });
          });
          this.filteredListAdmin = this.listAdmin.slice();
        });
        break;
    }
  }

  researchUser() {
    this.searchTerms.next(this.userService.user.nom);
    this.errorUserMessage.toggle = false;
  }

  getResearch(event: any) {
    this.ui_utilisateur.research = true;
    const searchValue = event.target.value.toLowerCase();
    switch (this.ui_utilisateur.actionSelected) {
      case 'service':
        this.filteredListServices = this.listServices.filter((row: any) => {
          return row.name.toLowerCase().startsWith(searchValue);
        });
        break;
      case 'group':
        this.filteredListGroup = this.listGroup.filter((row: any) => {
          return row.label.toLowerCase().startsWith(searchValue);
        });
        break;
      case 'admin':
        this.filteredListAdmin = this.listAdmin.filter((row: any) => {
          return row.name.toLowerCase().startsWith(searchValue);
        });
        break;
    }
  }

  clearSearch(type: 'user' | 'service') {
    this.deselectAllLines();

    if (type === 'user') {
      this.userService.user = {
        id: 0,
        uid: '',
        nom: '',
        groups: [],
        services: [],
      };
      this.userService.users = [];
      this.ui_utilisateur.userSelected = false;
    }
    this.ui_utilisateur.actionSelected = null;
  }

  getUserSelected(data: any) {
    this.ui_utilisateur.actionSelected = null;

    this.userService.user = {
      groups: [],
      services: [],
      id: data.id,
      uid: data.uid,
      nom: data.nom,
    };

    this.ui_utilisateur.userSelected = true;
    this.userService.getUser().then(() => {
      this.refreshData('service');
      this.refreshData('group');
      setTimeout(() => this.refreshData('admin'), 100);
    });
  }

  onCheckboxChange(id: any, row: any): void {
    let list: any[] = [];

    switch (this.ui_utilisateur.actionSelected) {
      case 'group':
        list = this.groupWebService.associateUserToGroups;
        break;
      case 'service':
        list = this.webService.associateUserToServices;
        break;
      case 'admin':
        list = this.webService.associateAdminUserToServices;
        break;
    }

    const indexToDelete = list.indexOf(id);
    row.checked ? list.push(id) : list.splice(indexToDelete, 1);
  }

  OnCheckboxChangeAll(event: Event) {
    const input = event.target as HTMLInputElement;
    input.checked ? this.selectAllLines() : this.deselectAllLines();
  }

  selectAllLines(): void {
    this.allChecked = true;
    switch (this.ui_utilisateur.actionSelected) {
      case 'group':
        this.filteredListGroup.forEach((row: any) => {
          row.checked = true;
          this.groupWebService.associateUserToGroups.push(row.id);
        });
        break;
      case 'service':
        this.filteredListServices.forEach((row: any) => {
          row.checked = true;
          this.webService.associateUserToServices.push(row.id);
        });
        break;
      case 'admin':
        this.filteredListAdmin.forEach((row: any) => {
          row.checked = true;
          this.webService.associateAdminUserToServices.push(row.id);
        });
        break;
    }
  }

  deselectAllLines(): void {
    this.allChecked = false;
    switch (this.ui_utilisateur.actionSelected) {
      case 'group':
        this.filteredListGroup.forEach((row: any) => (row.checked = false));
        this.groupWebService.associateUserToGroups = [];
        break;
      case 'service':
        this.filteredListServices.forEach((row: any) => (row.checked = false));
        this.webService.associateUserToServices = [];
        break;
      case 'admin':
        this.filteredListAdmin.forEach((row: any) => (row.checked = false));
        this.webService.associateAdminUserToServices = [];
        break;
    }
  }

  validate_association() {
    const body = {
      id_user: this.userService.user.id ? this.userService.user.id : null,
      uid: this.userService.user.uid,
      services: this.webService.associateUserToServices,
      groupe: this.groupWebService.associateUserToGroups,
      admin: this.webService.associateAdminUserToServices,
    };

    switch (this.ui_utilisateur.actionSelected) {
      case 'service':
        this.webService.setUserToService(body).then((res: any) => {
          if (res !== 0) {
            openErrorSnackBar(this._snackBar);
          } else {
            openValidateSnackBar(this._snackBar);
            this.userService.getUser().then(() => {
              this.deselectAllLines();
              this.refreshData('service');
              this.ui_utilisateur.actionSelected = null;
            });
          }
        });
        break;
      case 'group':
        this.groupWebService.setUserToGroup(body).then((res: any) => {
          if (res !== 0) {
            openErrorSnackBar(this._snackBar);
          } else {
            openValidateSnackBar(this._snackBar);
            this.userService.getUser().then(() => {
              this.deselectAllLines();
              this.refreshData('group');
              this.ui_utilisateur.actionSelected = null;
            });
          }
        });
        break;
      case 'admin':
        this.webService.setAdminUserToService(body).then((res: any) => {
          if (res !== 0) {
            openErrorSnackBar(this._snackBar);
          } else {
            openValidateSnackBar(this._snackBar);
            this.userService.getUser().then(() => {
              this.deselectAllLines();
              this.refreshData('admin');
              this.ui_utilisateur.actionSelected = null;
            });
          }
        });
        break;
    }
  }

  openDialogDelete(type: 'isAdmin' | 'noAdmin' | 'group', id: number): void {
    let dialogRef: MatDialogRef<DialogComponent, any>;
    let message: string;
    switch (type) {
      case 'noAdmin':
        message =
          'Êtes-vous sûr de vouloir supprimer le service pour cet utilisateur ?';
        dialogRef = this.dialog.open(DialogComponent, {
          data: { message: message },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result !== 0) return;
          this.delete(type, id);
        });
        break;
      case 'group':
        message =
          'Êtes-vous sûr de vouloir supprimer le groupe pour cet utilisateur ?';
        dialogRef = this.dialog.open(DialogComponent, {
          data: { message: message },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result !== 0) return;
          this.delete(type, id);
        });
        break;
      case 'isAdmin':
        message =
          "Êtes-vous sûr de vouloir supprimer l'administration de ce service pour cet utilisateur ?";
        dialogRef = this.dialog.open(DialogComponent, {
          data: { message: message },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result !== 0) return;
          this.delete(type, id);
        });
        break;
    }
  }

  delete(type: 'isAdmin' | 'group' | 'noAdmin', id: number) {
    const body = {
      id_user: this.userService.user.id,
      id_service: 0,
      id_groupe: 0,
      isAdmin: 0,
    };

    let indexToDelete: number;

    switch (type) {
      case 'group':
        body.id_groupe = id;
        this.groupWebService.deleteUserToGroup(body).then((res: any) => {
          if (res !== 0) {
            openErrorSnackBar(this._snackBar);
          } else {
            openValidateSnackBar(this._snackBar);
            indexToDelete = this.userService.user.groups.findIndex(
              (row: any) => row.id_groupe === body.id_groupe
            );
            this.userService.user.groups.splice(indexToDelete, 1);
            this.userService.getUser();
            this.refreshData('group');
          }
        });
        break;
      case 'noAdmin':
        body.id_service = id;
        this.webService.deleteUserToService(body).then((res: any) => {
          if (res !== 0) {
            openErrorSnackBar(this._snackBar);
          } else {
            openValidateSnackBar(this._snackBar);
            indexToDelete = this.userService.user.services.findIndex(
              (row: any) => row.id_service === body.id_service
            );
            this.userService.user.services.splice(indexToDelete, 1);
            this.refreshData('service');
          }
        });
        break;
      case 'isAdmin':
        body.id_service = id;
        this.webService.deleteAdminUserFromService(body).then((res: any) => {
          if (res !== 0) {
            openErrorSnackBar(this._snackBar);
          } else {
            openValidateSnackBar(this._snackBar);
            this.refreshData('admin');
          }
        });
        break;
    }
  }
}
