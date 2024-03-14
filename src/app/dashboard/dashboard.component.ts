import { Component, inject, OnInit } from '@angular/core';

import { StatistiquesService } from '../services/statistiques.service';
import { Subject } from 'rxjs';

interface Access {
  access: number;
  success: number;
  error: number;
}

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private statService = inject(StatistiquesService);

  // stats access users :
  public access: Access = {
    access: 0,
    success: 0,
    error: 0,
  };

  // data sending to charts dashboard :
  public scoreboardCharts: Subject<any> = new Subject();

  // access per usertypes :
  public resumeStats: Array<any> = [];
  public resumeDetailStats: Array<any> = [];

  public constructor() {}

  ngOnInit() {
    this.statService.get_access().subscribe((res: any) => {
      if (res.data) {
        this.access = res.data;
      }
    });

    this.statService.get_scoreboard().subscribe((res: any) => {
      this.scoreboardCharts.next(res.data);
    });

    this.statService.get_resume_access().subscribe((res: any) => {
      this.resumeStats = res.data.slice();
    });
  }

  get_resume_access_detail(usertype: string) {
    this.statService
      .get_resume_access_detail(usertype)
      .subscribe((res: any) => {
        this.resumeDetailStats = res.data.slice();
        console.log(this.resumeDetailStats);
      });
  }
}
