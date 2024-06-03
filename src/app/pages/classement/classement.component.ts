import { Component, OnInit, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
// import { StatistiquesService } from '../../services/statistiques.service';
import { WebService } from '../../services/webservice.service';
import { Subject } from 'rxjs';

interface ScoreboardData {
  ids: number[];
  labels: string[];
  data: string[];
}

@Component({
  selector: 'classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.scss'],
})
export class ClassementComponent implements OnInit {
  public webService = inject(WebService);

  public dataReceive!: ScoreboardData;
  public dataScoreboard: Subject<any> = new Subject();

  public dataScoreboardPagination!: any;

  public listPagination: Array<any> = [];
  public dataPagination: Array<any> = [];
  public idsPagination: Array<any> = [];

  public length: number = 0;
  public pageSizeOptions = [25, 50, 100];
  public pageEvent: PageEvent = new PageEvent();

  constructor() {}

  ngOnInit() {
    this.pageSizeOptions = [...this.pageSizeOptions, this.length];
    this.getDataScoreboard();
  }

  getDataScoreboard() {
    this.webService.get_totaly_scoreboard().then((res: any) => {
      this.dataReceive = res;
      this.length = res.data.length;
      this.dataScoreboardPagination = {
        data: res.data.slice(0, 25),
        labels: res.labels.slice(0, 25),
        ids: res.ids.slice(0, 25),
      };
      this.listPagination = this.getListPagination(0, 25);
      this.dataScoreboard.next(this.dataScoreboardPagination);
    });
  }

  getListPagination(startIndex: number, pageSize: number): Array<any> {
    return this.dataReceive.labels.slice(startIndex, pageSize);
  }

  getDataPagination(startIndex: number, pageSize: number) {
    return this.dataReceive.data.slice(startIndex, pageSize);
  }
  getIdsPagination(startIndex: number, pageSize: number) {
    return this.dataReceive.ids.slice(startIndex, pageSize);
  }

  handlePageEvent(e: PageEvent) {
    const startIndex = e.pageIndex * e.pageSize;
    this.listPagination = this.getListPagination(
      startIndex,
      startIndex + e.pageSize
    );
    this.dataPagination = this.getDataPagination(
      startIndex,
      startIndex + e.pageSize
    );
    this.idsPagination = this.getIdsPagination(
      startIndex,
      startIndex + e.pageSize
    );
    this.dataScoreboardPagination = {
      data: this.dataPagination,
      labels: this.listPagination,
      ids: this.idsPagination,
    };
    this.pageEvent = e;
    this.dataScoreboard.next(this.dataScoreboardPagination);
  }
}
