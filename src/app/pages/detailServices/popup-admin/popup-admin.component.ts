import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'popup-admin',
  templateUrl: './popup-admin.component.html',
  styleUrl: './popup-admin.component.scss',
})
export class PopupAdminComponent {
  @Input() dataReceive!: any[];
  @Input() togglePopup!: boolean;

  @Output() toggleInformationAdmin = new EventEmitter<boolean>();

  constructor() {}

  set_togglePopup() {
    this.toggleInformationAdmin.emit(!this.togglePopup);
  }
}
