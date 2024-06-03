import { Component, inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

// services :
import { WebService } from '../../services/webservice.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public webService = inject(WebService);

  // last update data :
  public lastUpdate!: string;

  // data sending to charts dashboard :
  public scoreboardCharts: Subject<any> = new Subject();

  public constructor() {}

  ngOnInit() {
    this.webService
      .get_last_update()
      .then((res: any) => (this.lastUpdate = res.toLocaleString('fr-FR')));

    this.webService.get_access();

    this.webService
      .get_scoreboard()
      .then((res: any) => this.scoreboardCharts.next(res));

    this.webService.get_resume_access();
  }
}
