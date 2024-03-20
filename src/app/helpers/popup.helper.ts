import { PopupValidateComponent } from '../administration/popup-validate/popup-validate.component';
import { PopupErrorComponent } from '../administration/popup-error/popup-error.component';

const durationInSeconds: number = 1;

export const openValidateSnackBar = (snackbar: any) => {
  snackbar.openFromComponent(PopupValidateComponent, {
    duration: durationInSeconds * 1000,
  });
};
export const openErrorSnackBar = (snackbar: any) => {
  snackbar.openFromComponent(PopupErrorComponent, {
    duration: durationInSeconds * 1000,
  });
};
