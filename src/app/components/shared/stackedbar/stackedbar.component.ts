import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import Annotation from 'chartjs-plugin-annotation';
import { Service } from '../../../interfaces/service.interface';
import { WebService } from '../../../services/webservice.service';

@Component({
  selector: 'stackedbar',
  templateUrl: './stackedbar.component.html',
  styleUrl: './stackedbar.component.scss',
})
export class StackedbarComponent implements OnInit, OnDestroy {
  public webService = inject(WebService);
  public dataService!: any;

  // reaction switch id :
  @Input() onDataChanged: any;
  @Input() isFullscreen!: Subject<boolean>;

  private onDataChangedSubscription!: Subscription;
  private onFullscreenChangeSubscription!: Subscription;

  constructor(private route: ActivatedRoute) {
    Chart.register(Annotation);
  }

  ngOnInit() {
    this.barChartData = {
      datasets: [],
      labels: [],
    };
    this.onDataChangedSubscription = this.onDataChanged.subscribe(
      (res: any) => {
        this.dataService = res;
        this.barChartData.labels = res.labels;
        this.barChartData.datasets = res.datasets;
        if (this.barChartOptions?.scales && this.barChartOptions.scales['y']) {
          this.barChartOptions.scales['y'].suggestedMax =
            this.webService.suggestedMaxChart;
        }
        if (
          this.barChartOptions?.plugins &&
          this.barChartOptions.plugins.title
        ) {
          this.barChartOptions.plugins.title.text = `Accés utilisateur ${res.title}`;
        }
        this.chart?.render();
      }
    );
    this.onFullscreenChangeSubscription = this.isFullscreen.subscribe(
      (res: boolean) => {
        const canvas = document.querySelectorAll('.stackedbar');
        if (!canvas) return;
        const ArrayCanvas = Array.from(canvas);
        if (!res) {
          ArrayCanvas.forEach((el: any) => {
            el.style.width = '750px';
          });
        } else {
          ArrayCanvas.forEach((el: any) => {
            el.style.width = '950px';
          });
        }
        this.chart?.update();
        this.chart?.render();
      }
    );
  }

  ngOnDestroy() {
    this.onDataChangedSubscription.unsubscribe();
    this.onFullscreenChangeSubscription.unsubscribe();
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
          minRotation: 45,
          maxRotation: 45,
          font: {
            size: 12,
          },
        },
      },
      y: {
        stacked: true,
        suggestedMin: 0,
        suggestedMax: 10,
        beginAtZero: true,
        ticks: {
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
    },
    interaction: {
      mode: 'index',
    },
    plugins: {
      title: {
        color: '#448a95',
        display: true,
        text: '',
        font: {
          size: 20,
          weight: 100,
        },
      },
      legend: {
        display: true,
        labels: {
          padding: 25,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      datalabels: {
        display: false,
      },
      tooltip: {
        boxPadding: 10,
        enabled: true,
        bodySpacing: 10,
        bodyFont: {
          size: 15,
        },
        titleFont: {
          size: 15,
        },
        titleMarginBottom: 15,
        footerMarginTop: 15,
        footerFont: {
          size: 15,
        },
        callbacks: {
          footer: (items) => {
            return 'Total : ' + items.reduce((a, b) => a + b.parsed.y, 0);
          },
        },
      },
    },
  };
}
