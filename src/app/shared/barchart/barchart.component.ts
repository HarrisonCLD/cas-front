import { Component, Input } from '@angular/core';
import {  OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { ChartConfiguration, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'barchart',
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.scss',
})
export class BarChartComponent implements OnInit {

  public barChartLegend = true;
  public barChartPlugins = [DataLabelsPlugin];
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';

  public barChartData!: ChartConfiguration['data'];

  constructor() {}

  ngOnInit() {
    // this.barChartData = this.data;
    // console.log(this.barChartData);
    // this.statService
    //   .get_totalaccess_perday()
    //   .subscribe((resp) => console.log(resp));
    // this.barChartData = {
    //   labels: [
    //     '2024-01-10',
    //     '2024-01-11',
    //     '2024-01-12',
    //     '2024-01-13',
    //     '2024-01-14',
    //     '2024-01-15',
    //   ],
    //   datasets: resp.data,
    //   }
  }
}
