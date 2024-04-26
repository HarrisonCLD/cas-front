import { Component, inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

// services :
import { StatistiquesService } from '../../services/statistiques.service';
import { formattedDate } from '../../helpers/date.helper';

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

  // last update data :
  public lastUpdate!: string;

  // data sending to charts dashboard :
  public scoreboardCharts: Subject<any> = new Subject();

  // access per usertypes :
  public resumeStats: any[] = [];
  public resumeDetailStats: any[] = [];

  public constructor() {}

  ngOnInit() {
    this.statService.get_last_update().subscribe((res: any) => {
      if (res.code !== 0) return;
      this.lastUpdate = formattedDate(res.data);
    });

    this.statService.get_access().subscribe((res: any) => {
      if (res.code !== 0) return;
      this.access = res.data;
    });

    this.statService.get_scoreboard().subscribe((res: any) => {
      if (res.code !== 0) return;
      this.scoreboardCharts.next(res.data);
    });

    this.statService.get_resume_access().subscribe((res: any) => {
      if (res.code !== 0) return;
      this.resumeStats = res.data.slice();
    });
  }

  get_resume_access_detail(usertype: string) {
    this.statService
      .get_resume_access_detail(usertype)
      .subscribe((res: any) => {
        this.resumeDetailStats = res.data.slice();
      });
  }
}
