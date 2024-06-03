import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrl: './dialog-component.component.scss',
})
export class DialogComponent {
  public data = inject(MAT_DIALOG_DATA);
  public nomDuGroupe: any;
  public errorLength: any;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  onOkClick(): void {
    this.dialogRef.close(0);
  }

  onNoClick(): void {
    this.dialogRef.close(1);
  }
}
