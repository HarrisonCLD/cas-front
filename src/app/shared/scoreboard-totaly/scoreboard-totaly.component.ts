import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Subscription } from 'rxjs';

@Component({
  selector: 'scoreboard-totaly',
  templateUrl: './scoreboard-totaly.component.html',
  styleUrl: './scoreboard-totaly.component.scss',
})
export class ScoreboardTotalyComponent implements OnInit, OnDestroy {
  @Input() dataSending: any;

  public dataChart: any = null;

  private DataChangedSubscription: Subscription = new Subscription();

  constructor() {}

  ngOnInit() {
    this.DataChangedSubscription = this.dataSending.subscribe((res: any) => {
      this.dataChart = res;
      this.barChartData.labels = this.dataChart.labels;
      this.barChartData.datasets[0].data = this.dataChart.data;
      Array.isArray(this.barChartData.datasets[0].backgroundColor) &&
        this.barChartData.datasets[0].backgroundColor?.push(
          'hsla(0, 100%, 50%, 0.4)',
          'hsla(20, 100%, 50%, 0.4)',
          'hsla(40, 100%, 50%,0.4)',
          'hsla(60, 100%, 50%, 0.4)',
          'hsla(80, 100%, 50%,0.4)',
          'hsla(100, 100%, 50%, 0.4)',
          'hsla(120, 100%, 50%, 0.4)',
          'hsla(140, 100%, 50%, 0.4)',
          'hsla(160, 100%, 50%, 0.4)',
          'hsla(180, 100%, 50%, 0.4)'
        );
      this.chart?.update();
    });
  }

  ngOnDestroy() {
    this.DataChangedSubscription.unsubscribe();
  }

  // Initialisation Angular ChartJS :
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartLegend = true;
  public barChartPlugins = [DataLabelsPlugin];
  public height = 830;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
        anchor: 'start',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        fill: true,
        // barThickness: 15,
        backgroundColor: [],
      },
    ],
  };
}
