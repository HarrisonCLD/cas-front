import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { StatistiquesService } from '../../../../services/statistiques.service';

import { openValidateSnackBar } from '../../../../helpers/popup.helper';
import { openErrorSnackBar } from '../../../../helpers/popup.helper';
import { Subject } from 'rxjs';

@Component({
  selector: 'dialog-group-service',
  templateUrl: './dialog-group-service.component.html',
  styleUrl: './dialog-group-service.component.scss',
})
export class DialogGroupServiceComponent {
  private statService = inject(StatistiquesService);
  mat_dialog = inject(MAT_DIALOG_DATA);

  public nomDuGroupe: string = '';

  public errorLength!: any;

  constructor(
    public dialogRef: MatDialogRef<DialogGroupServiceComponent>,
    private _snackBar: MatSnackBar
  ) {}

  onOkClick(): void {
    if (this.nomDuGroupe.length > 2) {
      this.statService
        .set_groupe({ label: this.nomDuGroupe })
        .subscribe((res) => {
          if (res.data > 0) {
            openValidateSnackBar(this._snackBar);
            this.dialogRef.close({
              code: 1,
              label: this.nomDuGroupe,
            });
          } else {
            openErrorSnackBar(this._snackBar);
            this.dialogRef.close({ code: 0 });
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
