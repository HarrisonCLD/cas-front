import { Component, Inject, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { StatistiquesService } from '../../../../services/statistiques.service';

import { openValidateSnackBar } from '../../../../helpers/popup.helper';
import { openErrorSnackBar } from '../../../../helpers/popup.helper';

@Component({
  selector: 'dialog-edit-label',
  templateUrl: './dialog-edit-label.component.html',
  styleUrl: './dialog-edit-label.component.scss',
})
export class DialogEditLabelComponent {
  private statService = inject(StatistiquesService);

  public nomDuGroupe: string = '';

  public errorLength!: any;

  constructor(
    public dialogRef: MatDialogRef<DialogEditLabelComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onOkClick(): void {
    if (this.nomDuGroupe.length > 2) {
      this.statService
        .set_edit_label_group({ id: this.data.id, label: this.nomDuGroupe })
        .subscribe((res) => {
          if (res.data > 0) {
            openValidateSnackBar(this._snackBar);
            return this.dialogRef.close({
              code: 1,
              id: this.data.id,
              label: this.nomDuGroupe,
            });
          } else {
            openErrorSnackBar(this._snackBar);
            return this.dialogRef.close({ code: 0 });
          }
        });
    } else {
      this.errorLength = 'min. 3 lettres';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
