import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  @Output() onFullScreen = new EventEmitter<boolean>();

  public fullscreenSave: boolean = false;

  // data about service :
  public dataServiceID: any;
  public dataService: any;

  // style charts :
  public height: any;

  // reaction switch id :
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
        console.log(this.dataService);
      }
    );
  }

  fullScreen() {
    this.fullscreenSave = !this.fullscreenSave;
    this.onFullScreen.emit(this.fullscreenSave);
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
