import { Component, inject } from '@angular/core';
import { WebService } from '../../../services/webservice.service';
import { GroupeWebService } from '../../../services/groupewebservice.service';

@Component({
  selector: 'groupservice',
  templateUrl: './groupservice.component.html',
  styleUrl: './groupservice.component.scss',
})
export class GroupserviceComponent {
  private webServices = inject(WebService);
  private groupsServices = inject(GroupeWebService);

  public loader: boolean = true;

  public groupServiceNavigation: number = 1;
  public serviceToAssociate!: number | undefined;

  constructor() {
    this.getData();
  }

  private async getData() {
    this.groupsServices
      .getGroups()
      .then(() =>
        this.webServices.getServices().then(() => (this.loader = false))
      );
  }

  setGroupeServiceNavigation(id: number) {
    this.groupServiceNavigation = id;
  }

  onServiceClicked(id: number) {
    this.serviceToAssociate = id;
    this.groupServiceNavigation = 2;
  }
}
