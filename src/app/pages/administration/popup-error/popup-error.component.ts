import { Component, inject } from '@angular/core';

import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'popup-error',
  templateUrl: 'popup-error.component.html',
  styleUrl: './popup-error.component.scss',
})
export class PopupErrorComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor() {}
}
