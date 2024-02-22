import { Component, inject, OnInit } from '@angular/core';

import { StatistiquesService } from '../services/statistiques.service';
import { UIService } from '../services/ui.service';

const svgStudent = 'assets/student.svg';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private statService = inject(StatistiquesService);
  private uiService = inject(UIService);

  // Stats access :
  public totalaccess!: number;
  public successConnection!: number;
  public failedConnection!: number;

  // Data sending to charts dashboard :
  public scoreboardCharts: any;

  // Access per usertypes :
  public resumeStats: any;
  public resumeDetailStats: any;

  public constructor() {}

  ngOnInit() {
    // Stats access subscribe :
    this.statService.get_access().subscribe((res: any) => {
      if (parseInt(res.data) > 0) {
        this.totalaccess = res.data.access;
        this.successConnection = res.data.success;
        this.failedConnection = res.data.error;
      } else {
        this.totalaccess = 0;
        this.successConnection = 0;
        this.failedConnection = 0;
      }
    });

    // Stats scoreboard subscribe :
    this.statService.get_scoreboard().subscribe((res: any) => {
      this.scoreboardCharts = res.data;
    });

    // Resume stats dashboard subscribe :
    this.statService.get_resume_access().subscribe((res: any) => {
      this.resumeStats = res.data;
    });
  }

  // Resume detail stats dashboard subscribe :
  get_resume_access_detail(usertype: string) {
    this.statService
      .get_resume_access_detail(usertype)
      .subscribe((res: any) => {
        this.resumeDetailStats = res.data;
      });
  }
}
