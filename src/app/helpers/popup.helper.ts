import { PopupValidateComponent } from '../components/shared/popup-validate/popup-validate.component';
import { PopupErrorComponent } from '../components/shared/popup-error/popup-error.component';

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
