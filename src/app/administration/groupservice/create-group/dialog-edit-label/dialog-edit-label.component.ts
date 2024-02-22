import { Component, Inject, inject } from '@angular/core';
import { StatistiquesService } from '../../../../services/statistiques.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupValidateComponent } from '../../../popup-validate/popup-validate.component';
import { PopupErrorComponent } from '../../../popup-error/popup-error.component';

@Component({
  selector: 'dialog-edit-label',
  templateUrl: './dialog-edit-label.component.html',
  styleUrl: './dialog-edit-label.component.scss',
})
export class DialogEditLabelComponent {
  private statService = inject(StatistiquesService);

  public durationInSeconds: number = 40;

  public nomDuGroupe: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogEditLabelComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onOkClick(): void {
    this.statService
      .set_edit_label_group({ id: this.data.id, label: this.nomDuGroupe })
      .subscribe((res) => {
        res.data > 0 ? this.openValidateSnackBar() : this.openErrorSnackBar();
      });
    this.dialogRef.close();
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  onNoClick(): void {
    this.dialogRef.close();
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
}
