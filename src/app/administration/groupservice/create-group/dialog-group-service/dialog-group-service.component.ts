import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StatistiquesService } from '../../../../services/statistiques.service';
import { PopupValidateComponent } from '../../../popup-validate/popup-validate.component';
import { PopupErrorComponent } from '../../../popup-error/popup-error.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'dialog-group-service',
  templateUrl: './dialog-group-service.component.html',
  styleUrl: './dialog-group-service.component.scss',
})
export class DialogGroupServiceComponent {
  private statService = inject(StatistiquesService);
  mat_dialog = inject(MAT_DIALOG_DATA);

  public nomDuGroupe: string = '';
  public durationInSeconds: number = 40;

  constructor(
    public dialogRef: MatDialogRef<DialogGroupServiceComponent>,
    private _snackBar: MatSnackBar
  ) {}


  onOkClick(): void {
    this.statService.set_groupe({"label": this.nomDuGroupe}).subscribe((res) => {
      res.data > 0 ? this.openValidateSnackBar() : this.openErrorSnackBar();
    });
    this.dialogRef.close();
    setTimeout(() => {
      location.reload();
    }, 500)
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
