import { Component } from '@angular/core';

@Component({
  selector: 'groupservice',
  templateUrl: './groupservice.component.html',
  styleUrl: './groupservice.component.scss',
})
export class GroupserviceComponent {
  // navigation tab in groupe service administration :
  public groupServiceNavigation: number = 1;

  // association array (groupe_service, user_service, user_groupe) :
  public serviceToAssociate!: number | undefined;

  // list of groups services :
  public listgroup!: any | undefined;

  constructor() {}

  set_groupServiceNavigation(id: number) {
    this.groupServiceNavigation = id;
  }

  onServiceClicked(id: number) {
    this.serviceToAssociate = id;
    this.groupServiceNavigation = 2;
  }
}
