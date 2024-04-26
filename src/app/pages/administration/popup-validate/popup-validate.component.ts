import { Component, inject } from '@angular/core';

import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'popup-validate',
  templateUrl: 'popup-validate.component.html',
  styleUrl: './popup-validate.component.scss',
})
export class PopupValidateComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor() {}
}
