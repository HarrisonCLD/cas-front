import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'groupservice',
  templateUrl: './groupservice.component.html',
  styleUrl: './groupservice.component.scss',
})
export class GroupserviceComponent {
  public groupServiceNavigation: number = 1;
  public serviceToAssociate!: number;

  public listgroup!: any;

  constructor() {}

  set_groupServiceNavigation(id: number) {
    this.groupServiceNavigation = id;
  }

  onServiceClicked(id:number) {
    this.serviceToAssociate= id;
    this.groupServiceNavigation = 2;
  }
}
