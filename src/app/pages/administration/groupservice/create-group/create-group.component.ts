import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';

// material :
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// services :
import { GroupeWebService } from '../../../../services/groupewebservice.service';

// helpers :
import {
  openErrorSnackBar,
  openValidateSnackBar,
} from '../../../../helpers/popup.helper';

import { DialogComponent } from '../../../../components/shared/dialog-component/dialog-component.component';
import { DialogEditComponent } from '../../../../components/shared/dialog-edit/dialog-edit.component';

@Component({
  selector: 'create-group',
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss',
})
export class CreateGroupComponent implements OnInit {
  private groupsWebServices = inject(GroupeWebService);

  @Output() serviceNavigation: EventEmitter<number> =
    new EventEmitter<number>();

  public filteredGroupsServices!: any[];

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.recoverGroups();
  }

  private recoverGroups(): void {
    this.filteredGroupsServices = this.groupsWebServices.listGroups.slice();
  }

  openDialogEditGroup(event: Event, data: any): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogEditComponent, {
      data: {
        message: 'Veuillez indiquer le nouveau du groupe',
        payload: '',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        openErrorSnackBar(this._snackBar);
        return;
      }
      this.groupsWebServices
        .updateGroup(data.id, { id: data.id, label: result })
        .then(() => {
          console.log('recover', this.groupsWebServices.listGroups);
          this.recoverGroups();
        });
    });
  }

  openDialogDeleteGroup(event: Event, data: any): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: 'Êtes-vous sûr de vouloir supprimer ce groupe ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 0) return;
      this.groupsWebServices.deleteGroup(data.id).then((res: any) => {
        if (res === 0) {
          openValidateSnackBar(this._snackBar);
          this.recoverGroups();
        } else {
          openErrorSnackBar(this._snackBar);
        }
      });
    });
  }

  openDialogCreateGroup(): void {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      data: {
        message: 'Indiquer le nom de votre nouveau groupe',
        payload: '',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        openErrorSnackBar(this._snackBar);
        return;
      }
      this.groupsWebServices
        .createGroup({ label: result })
        .then(() => this.recoverGroups());
    });
  }

  onChangeGroupAssociate(id: number) {
    this.serviceNavigation.emit(id);
  }
}
