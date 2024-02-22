import { Component, OnInit, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LDAPService } from '../../services/ldap.service';


@Component({
  selector: 'utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.scss',
})
export class UtilisateurComponent {
  private userService = inject(LDAPService);

  public nom!: string;
  public prenom!: string;
  public uid!: string;

  // Pagination :
  public length!: any;
  public pageSize = 25;
  public pageIndex = 0;
  public pageSizeOptions = [25, 50, 100];
  public hidePageSize = false;
  public showPageSizeOptions = true;
  public showFirstLastButtons = true;
  public disabled = false;
  public pageEvent!: PageEvent;

  constructor() {}

  search_user(search: object) {
    this.userService.get_user(search).subscribe((res) => console.log(res));
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    let paginationStartBy = this.pageIndex * this.pageSize;
  }
}
