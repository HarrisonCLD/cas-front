import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.scss',
})
export class DialogEditComponent {
  public data = inject(MAT_DIALOG_DATA);

  public errorLength!: any;

  constructor(public dialogRef: MatDialogRef<DialogEditComponent>) {}

  onOkClick(): void {
    console.log(this.data.payload);
    this.dialogRef.close(this.data.payload);
  }

  onNoClick(): void {
    this.dialogRef.close(1);
  }
}
