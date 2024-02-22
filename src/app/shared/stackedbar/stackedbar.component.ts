import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'stackedbar',
  templateUrl: './stackedbar.component.html',
  styleUrl: './stackedbar.component.scss',
})
export class StackedbarComponent implements OnInit, OnDestroy {
  // Data service :
  public dataServiceID: any;
  public dataService: any;

  // Style Charts :
  public height: any;

  // Follow change ID :
  @Input() onDataChanged: any;

  private onDataChangedSubscription!: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.barChartData = {
      datasets: [],
      labels: [],
    };

    this.route.params.subscribe((params: Params) => {
      this.dataServiceID = params['id'];
    });

    this.onDataChangedSubscription = this.onDataChanged.subscribe(
      (res: any) => {
        this.dataService = res;
        this.barChartData.labels = this.dataService?.labels;
        this.barChartData.datasets = this.dataService?.datasets;
        this.chart?.render();
      }
    );
  }

  ngOnDestroy() {
    this.onDataChangedSubscription.unsubscribe();
  }

  // Initialisation Angular ChartJS :
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartType: ChartType = 'bar';
  public barChartData!: ChartData<'bar'>;
  public barChartPlugins = [DataLabelsPlugin];

  public barChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {
        stacked: true,
        ticks: {
          minRotation: 0,
          maxRotation: 45,
        },
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      annotation: {
        // annotations: [
        //   {
        //     type: 'line',
        //     scaleID: 'y',
        //     value: res.data.moyenne.toString(),
        //     borderColor: 'orange',
        //     borderWidth: 2,
        //     label: {
        //       display: true,
        //       position: 'center',
        //       color: 'orange',
        //       content: res.data.moyenne.toString(),
        //       font: {
        //         weight: 'bold',
        //       },
        //     },
        //   },
        // ],
      },
      legend: {
        display: true,
      },
      datalabels: {
        display: false,
      },
    },
  };
}
