import { Component, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { StatistiquesService } from '../services/statistiques.service';

@Component({
  selector: 'classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.scss'],
})
export class ClassementComponent implements OnInit {
  private statService = inject(StatistiquesService);

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

  // Classement Chart:
  public dataScoreboard: any;
  public dataScoreboardPagination: any;

  // Liste des services :
  public listScoreboard: Array<any> = [];
  public listPagination!: Array<any>;

  // Subject change data :
  public onDataChange: Subject<any> = new Subject();

  ngOnInit() {
    this.statService.get_totaly_scoreboard().subscribe((res) => {
      this.dataScoreboard = res.data;
      this.pageSizeOptions = [25, 50, 100, this.dataScoreboard.data.length];
      this.dataScoreboardPagination = { data: [], labels: [] };

      this.dataScoreboardPagination.data = this.dataScoreboard.data.slice(
        this.pageIndex * this.pageSize,
        this.pageSize + this.pageIndex * this.pageSize
      );
      this.dataScoreboardPagination.labels = this.dataScoreboard.labels.slice(
        this.pageIndex * this.pageSize,
        this.pageSize + this.pageIndex * this.pageSize
      );

      for (let i = 0; i < res.data.labels.length; i++) {
        this.listScoreboard.push({
          id: res.data?.ids[i],
          label: res.data?.labels[i],
          access: res.data?.data[i],
        });
      }
      res.data.data ? (this.length = res.data.data.length) : null;
      this.listPagination = this.listScoreboard?.slice(
        this.pageIndex * this.pageSize,
        this.pageSize + this.pageIndex * this.pageSize
      );
    });

    setTimeout(() => {
      this.onDataChange.next(this.dataScoreboardPagination);
    }, 300);
  }

  // get_order() {
  //   this.order = !this.order;
  //   this.listScoreboard.reverse();
  //   this.dataScoreboard.ids.reverse();
  //   this.dataScoreboard.labels.reverse();
  //   this.dataScoreboard.data.reverse();
  // }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    let paginationStartBy = this.pageIndex * this.pageSize;
    this.listPagination = [];
    this.listPagination = this.listScoreboard?.slice(
      paginationStartBy,
      paginationStartBy + this.pageSize
    );
    this.dataScoreboardPagination.data = this.dataScoreboard.data.slice(
      paginationStartBy,
      paginationStartBy + this.pageSize
    );
    this.dataScoreboardPagination.labels = this.dataScoreboard.labels.slice(
      paginationStartBy,
      paginationStartBy + this.pageSize
    );
    this.onDataChange.next(this.dataScoreboardPagination);
  }
}
