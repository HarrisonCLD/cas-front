import { Component, OnInit, inject } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

// angular material :
import { MatSnackBar } from '@angular/material/snack-bar';

// services :
import { StatistiquesService } from '../../../services/statistiques.service';
import { UserService } from '../../../services/user.service';
import { WebService } from '../../../services/webservice.service';

// models :
import User from '../../../../models/user.model';

// helpers :
import {
  openValidateSnackBar,
  openErrorSnackBar,
} from '../../../helpers/popup.helper';
import { GroupeWebService } from '../../../services/groupewebservice.service';

interface UIUtilisateur {
  userSelected?: boolean;
  actionSelected?: number | null;
  serviceValue?: string;
  groupValue?: string;
}

@Component({
  selector: 'utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.scss',
})
export class UtilisateurComponent implements OnInit {
  private statService = inject(StatistiquesService);
  private userService = inject(UserService);
  private webService = inject(WebService);
  private groupWebService = inject(GroupeWebService);

  // user search subject :
  private searchTerms = new Subject<string>();

  // list of users :
  public users: Array<User> = [];

  // value of diferents items ( searching, selected, ...) :
  public ui_utilisateur: UIUtilisateur = new Object();

  // user entitie :
  public user: User = new User();

  // list of services :
  public listServices: Array<any> = [];
  public filteredListServices: Array<any> = [];

  // list of groups :
  public listGroup: Array<any> = [];
  public filteredListGroup: Array<any> = [];

  // array of associations :
  public groupServices: Array<any> = [];

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // delay for automatic user search with a limit of 3 letters :
    this.searchTerms.pipe(debounceTime(250)).subscribe((searchTerm: string) => {
      if (searchTerm.length > 2) {
        this.userService
          .getUsers(this.user.nom)
          .then((res: any) => (this.users = res.slice()));
      }
    });
  }

  researchUser() {
    this.searchTerms.next(this.user.nom);
  }

  clearSearch(id: number) {
    // reset the different possibilities :
    switch (id) {
      case 1:
        this.user.nom = '';
        this.ui_utilisateur.userSelected = false;
        this.users = [];
        break;
      case 2:
        this.ui_utilisateur.serviceValue = '';
        this.filteredListServices = this.listServices;
        break;
      case 3:
        this.ui_utilisateur.groupValue = '';
        this.filteredListGroup = this.listGroup;
        break;
    }
  }

  get_action(id: number) {
    let target: number;
    // reset ui utilisateur :
    this.ui_utilisateur = {
      ...this.ui_utilisateur,
      actionSelected: id,
      serviceValue: undefined,
      groupValue: undefined,
    };
    this.groupServices = [];

    switch (id) {
      case 1:
        // get id, uid, services, groups of user selected :
        // this.statService.get_infos_user(this.user.uid).subscribe((res: any) => {
        //   Object.assign(this.user, res.data);

        //   // sort list of services by administrator and A-Z :
        //   this.user.services.sort((a, b) => {
        //     if (a.isAdmin != null && b.isAdmin != null) {
        //       if (a.isAdmin !== b.isAdmin) {
        //         return b.isAdmin - a.isAdmin;
        //       }
        //     }
        //     if (typeof a.fqdn === 'string' && typeof b.fqdn === 'string') {
        //       return a.fqdn.localeCompare(b.fqdn);
        //     }
        //     return 0;
        //   });
        // });
        this.userService.getUser(this.user.nom);
        this.userService.user.services.sort((a: any, b: any) => {
          if (a.isAdmin != null && b.isAdmin != null) {
            if (a.isAdmin !== b.isAdmin) {
              return b.isAdmin - a.isAdmin;
            }
          }
          if (typeof a.fqdn === 'string' && typeof b.fqdn === 'string') {
            return a.fqdn.localeCompare(b.fqdn);
          }
          return 0;
        });
        break;
      case 2:
        // get services database and user services for the filter :
        // this.statService
        //   .get_service_user(this.user.id)
        //   .subscribe((res: any) => {
        //     this.listServices = res.data.slice();
        //     this.filterListServices = res.data.slice();
        //   });
        target = 1;
        this.webService.getUserServices(target);
        this.filteredListServices = this.webService.userServices.slice();
        break;
      case 3:
        // get groups database and user groups for the filter :
        // this.statService.get_groupe_user(this.user.id).subscribe((res: any) => {
        //   this.listGroup = res.data.slice();
        //   this.filterListGroup = res.data.slice();
        // });
        target = 1;
        this.groupWebService.getUserGroups(target);
        this.filteredListGroup = this.groupWebService.userGroups.slice();
        break;
      case 4:
        // get services database and user admin services for the filter :
        this.statService
          .get_user_admin_service(this.user.id)
          .subscribe((res: any) => {
            this.listServices = res.data.slice();
            this.filteredListServices = res.data.slice();
          });
        break;
    }
  }

  selectAll(action: number, div: string, array: Array<any>): void {
    let otherInput: HTMLInputElement | null;
    switch (action) {
      case 1:
        otherInput = document.querySelector(div + '.deselect');
        otherInput ? (otherInput.checked = false) : null;
        array.map((row: any) => {
          row.checked = true;
          if (row.checked) {
            this.groupServices.push(row.id);
          }
        });
        break;
      case 2:
        otherInput = document.querySelector(div + '.select');
        otherInput ? (otherInput.checked = false) : null;
        array.map((row: any) => {
          row.checked = false;
          if (!row.checked) {
            const indexToDelete = this.groupServices.indexOf(row.id);
            if (indexToDelete !== -1) {
              this.groupServices.splice(indexToDelete, 1);
            }
          }
        });
        break;
    }
  }

  getUserSelected(data: any) {
    console.log('data', data);
    this.userService
      .getUser(data.uid)
      .then((res: any) => console.log('user', res));
    // this.statService.get_infos_user(this.user.uid).subscribe((res: any) => {
    //   if (res.code === 0) {
    //     Object.assign(this.user, res.data);

    //     // sort list of services by administrator and A-Z :
    //     this.user.services.sort((a, b) => {
    //       if (a.isAdmin != null && b.isAdmin != null) {
    //         if (a.isAdmin !== b.isAdmin) {
    //           return b.isAdmin - a.isAdmin;
    //         }
    //       }
    //       if (typeof a.fqdn === 'string' && typeof b.fqdn === 'string') {
    //         return a.fqdn.localeCompare(b.fqdn);
    //       }
    //       return 0;
    //     });
    //   }
    // });
    // this.ui_utilisateur.userSelected = true;
    // const name: string = '';
    // this.userService.getUser(name);
    // this.userService.user.services.sort((a: any, b: any) => {
    //   if (a.isAdmin != null && b.isAdmin != null && a.isAdmin !== b.isAdmin)
    //     return b.isAdmin - a.isAdmin;
    //   if (typeof a.fqdn === 'string' && typeof b.fqdn === 'string')
    //     return a.fqdn.localeCompare(b.fqdn);
    //   return 0;
    // });
    // this.ui_utilisateur.userSelected = true;
  }

  onCheckboxChange(id: any, row: any): void {
    // check and delete associations of services/groups :
    if (row.checked) {
      this.groupServices.push(id);
    } else {
      const indexToDelete = this.groupServices.indexOf(id);
      if (indexToDelete !== -1) this.groupServices.splice(indexToDelete, 1);
    }
  }

  delete(mode: number, id: number) {
    // template for HTTP request :
    const body = {
      id_user: this.user.id,
      id_service: 0,
      id_groupe: 0,
    };
    let indexToDelete: number;
    switch (mode) {
      case 1:
        body.id_groupe = id;
        // this.groupWebService.deleteUserToGroup(id);
        openValidateSnackBar(this._snackBar);
        indexToDelete = this.user.groups.findIndex(
          (row: any) => row.id_groupe === body.id_groupe
        );
        if (indexToDelete !== -1) this.user.groups.splice(indexToDelete, 1);
        // this.statService.delete_group_to_user(body).subscribe((res: any) => {
        //   if (res.data === 1) {
        //     openValidateSnackBar(this._snackBar);
        //     const indexToDelete = this.user.groups.findIndex(
        //       (row: any) => row.id_groupe === body.id_groupe
        //     );
        //     if (indexToDelete !== -1) {
        //       this.user.groups.splice(indexToDelete, 1);
        //     }
        //   } else {
        //     openErrorSnackBar(this._snackBar);
        //   }
        // });
        break;

      case 2:
        body.id_service = id;
        this.webService.deleteUserToService(id);
        openValidateSnackBar(this._snackBar);
        indexToDelete = this.user.services.findIndex(
          (row: any) => row.id_service === body.id_service
        );
        if (indexToDelete !== -1) this.user.services.splice(indexToDelete, 1);

        // this.statService.delete_service_to_user(body).subscribe((res: any) => {
        //   if (res.data === 1) {
        //     openValidateSnackBar(this._snackBar);
        //     const indexToDelete = this.user.services.findIndex(
        //       (row: any) => row.id_service === body.id_service
        //     );
        //     if (indexToDelete !== -1) {
        //       this.user.services.splice(indexToDelete, 1);
        //     }
        //   } else {
        //     openErrorSnackBar(this._snackBar);
        //   }
        // });
        break;
      case 3:
        body.id_service = id;
        // this.statService.delete_admin_to_user(body).subscribe((res: any) => {
        //   if (res.data === 1) {
        //     openValidateSnackBar(this._snackBar);
        //     const indexToDelete = this.user.services.findIndex(
        //       (row: any) => row.id_service === body.id_service
        //     );
        //     if (indexToDelete !== -1) {
        //       this.user.services.splice(indexToDelete, 1);
        //     }
        //   } else {
        //     openErrorSnackBar(this._snackBar);
        //   }
        // });
        break;
    }
  }

  validate_association() {
    // template for HTTP request :
    const body = {
      id_user: this.user.id ? this.user.id : null,
      uid: this.user.uid,
      services: this.groupServices,
    };

    switch (this.ui_utilisateur.actionSelected) {
      case 2:
        this.webService.setUserToService(body);
        openValidateSnackBar(this._snackBar);
        this.filteredListServices = [];
        this.ui_utilisateur.actionSelected = null;
        // this.statService.set_service_to_user(body).subscribe((res: any) => {
        //   if (res.code === 0) {
        //     openValidateSnackBar(this._snackBar);
        //     this.filterListServices = [];
        //     this.ui_utilisateur.actionSelected = null;
        //   } else {
        //     openErrorSnackBar(this._snackBar);
        //   }
        // });
        break;

      case 3:
        this.groupWebService.setUserToGroup(body);
        openValidateSnackBar(this._snackBar);
        this.filteredListGroup = [];
        this.ui_utilisateur.actionSelected = null;
        // this.statService.set_group_to_user(body).subscribe((res: any) => {
        //   if (res.code === 0) {
        //     openValidateSnackBar(this._snackBar);
        //     this.filterListGroup = [];
        //     this.ui_utilisateur.actionSelected = null;
        //   } else {
        //     openErrorSnackBar(this._snackBar);
        //   }
        // });
        break;

      case 4:
        this.statService.set_user_admin_service(body).subscribe((res: any) => {
          if (res.code === 0) {
            openValidateSnackBar(this._snackBar);
            this.filteredListServices = [];
            this.ui_utilisateur.actionSelected = null;
          } else {
            openErrorSnackBar(this._snackBar);
          }
        });
        break;
    }
  }

  get_searchChange(id: number, event: any) {
    // services and groups search bar :
    switch (id) {
      case 1:
        this.filteredListServices = this.webService.listServices.filter(
          (row: any) => {
            return row.name.startsWith(event.target.value);
          }
        );
        this.ui_utilisateur.serviceValue = event.target.value;
        break;

      case 2:
        this.filteredListGroup = this.groupWebService.listGroups.filter(
          (row: any) => {
            return row.label.startsWith(event.target.value);
          }
        );
        this.ui_utilisateur.groupValue = event.target.value;
        break;
    }
  }
}
