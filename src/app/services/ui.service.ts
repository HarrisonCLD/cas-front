import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  public showInputs: boolean = false;

  // Selected list services :
  public selectedID: any;

  constructor() {}

  set_showInputs(bool: boolean): void {
    this.showInputs = bool;
  }

  set_selectedID(id: number): void {
    this.selectedID = id;
  }

  set_format_date(date: string) {
    let originalDate = new Date(date);
    let year = originalDate.getFullYear();
    let month = originalDate.getMonth() + 1;
    let day = originalDate.getDate();
    let formattedDate =
      year +
      '-' +
      (month < 10 ? '0' : '') +
      month +
      '-' +
      (day < 10 ? '0' : '') +
      day;
      return formattedDate;
  }
}
