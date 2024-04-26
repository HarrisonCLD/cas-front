import { Component, OnInit, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { StatistiquesService } from '../../services/statistiques.service';

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
  public statService = inject(StatistiquesService);

  public dataScoreboard!: ScoreboardData[];

  public listPagination: Array<any> = [];
  public length: number = 0;
  public pageSizeOptions = [25, 50, 100];
  public pageEvent: PageEvent = new PageEvent();

  constructor() {}

  ngOnInit() {
    this.pageSizeOptions = [...this.pageSizeOptions, this.length];
    this.getDataScoreboard();
  }

  getDataScoreboard() {
    // this.statService.get_totaly_scoreboard().subscribe((res) => {
    //   this.length = res.data?.data.length || 0;
    //   this.pageSizeOptions = [...this.pageSizeOptions, this.length];
    //   this.dataScoreboardPagination = {
    //     data: res.data?.data.slice(0, 25),
    //     labels: res.data?.labels.slice(0, 25),
    //   };
    //   this.listPagination = this.getListPagination(0, 25);
    // });
    // this.statService.get_totaly_scoreboard().then((res: any) => {
    //   console.log(res);
    //   this.length = res?.data.length || 0;
    //   this.dataScoreboardPagination = {
    //     data: res?.data.slice(0, 25),
    //     labels: res?.labels.slice(0, 25),
    //   };
    //   this.listPagination = this.getListPagination(0, 25);
    // });
  }

  // getListPagination(startIndex: number, pageSize: number): Array<any> {
  //   return this.dataScoreboardPagination.data.slice(
  //     startIndex,
  //     startIndex + pageSize
  //   );
  // }

  handlePageEvent(e: PageEvent) {
    const startIndex = e.pageIndex * e.pageSize;
    // this.listPagination = this.getListPagination(startIndex, e.pageSize);
    this.pageEvent = e;
  }
}
