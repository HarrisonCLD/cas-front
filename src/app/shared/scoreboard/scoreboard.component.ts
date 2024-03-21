import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Subscription } from 'rxjs';

@Component({
  selector: 'scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss',
})
export class ScoreboardComponent implements OnInit {
  // data received from subject for the construction of the charts :
  @Input() dataSending: any;
  
  // subcription for updating charts :
  public dateReceive: Subscription = new Subscription();

  // data used
  public data: any;

  constructor() {}

  ngOnInit() {
    this.dateReceive = this.dataSending.subscribe((res: any) => {
      this.data = res;
      if (this.data) {
        this.height = this.data.labels.slice(0, 10).length * 40;
        this.barChartData = {
          labels: this.data.labels.slice(0, 10),
          datasets: [
            {
              label: 'Top 10',
              data: this.data.data.slice(0, 10),
              fill: false,
              barThickness: 20,
              backgroundColor: [
                'hsla(0, 100%, 50%, 0.4)',
                'hsla(20, 100%, 50%, 0.4)',
                'hsla(40, 100%, 50%,0.4)',
                'hsla(60, 100%, 50%, 0.4)',
                'hsla(80, 100%, 50%,0.4)',
                'hsla(100, 100%, 50%, 0.4)',
                'hsla(120, 100%, 50%, 0.4)',
                'hsla(140, 100%, 50%, 0.4)',
                'hsla(160, 100%, 50%, 0.4)',
                'hsla(180, 100%, 50%, 0.4)',
              ],
            },
          ],
        };
      }
    });
  }

  // Initialisation Angular ChartJS :
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartLegend = true;
  public barChartPlugins = [DataLabelsPlugin];
  public height = 50;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: false,
    indexAxis: 'y',
    scales: {
      y: {
        ticks: {
          autoSkip: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartData!: ChartConfiguration['data'];
}
