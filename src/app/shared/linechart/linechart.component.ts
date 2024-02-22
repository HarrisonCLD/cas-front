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
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { StatistiquesService } from '../../services/statistiques.service';
import { Subject, Subscription } from 'rxjs';

import Annotation from 'chartjs-plugin-annotation';

@Component({
  selector: 'linechart',
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.scss',
})
export class LinechartComponent implements OnInit, OnDestroy {
  private statService = inject(StatistiquesService);

  // ID service demandé :
  @Input() dataSending: any;

  // Follow change ID :
  @Input() onServiceIdChanged!: Subject<number>;
  @Output() loaded: EventEmitter<boolean> = new EventEmitter<boolean>();
  private onServiceIdChangedSubscription!: Subscription;
  private onDateChangedSubscription!: Subscription;
  public selectedId:any;

  constructor() {
    Chart.register(Annotation);
  }

  ngOnInit() {
    // this.selectedId = this.dataSending.id;
    // this.onServiceIdChangedSubscription = this.onServiceIdChanged.subscribe(
    //   (id:number) => {
    //     this.selectedId = id;
    //     this.fetchData()
    //   }
    // );
    // this.onDateChangedSubscription = this.statService.dateChanged.subscribe(() => this.fetchData());
    // this.loaded.emit(true);
  }

  // fetchData() {
  //   this.statService
  //   .get_total_access_per_service(this.selectedId)
  //   .subscribe((res) => {
  //     this.lineChartOptions!.plugins = {
  //       legend: { display: false },
  //       annotation: {
  //         annotations: [
  //           {
  //             type: 'line',
  //             scaleID: 'y',
  //             value: res.data.moyenne.toString(),
  //             borderColor: 'orange',
  //             borderWidth: 2,
  //             label: {
  //               display: true,
  //               position: 'center',
  //               color: 'orange',
  //               content: res.data.moyenne.toString(),
  //               font: {
  //                 weight: 'bold',
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     };
  //     this.lineChartData = {
  //       datasets: [],
  //       labels: [],
  //     };
  //     this.lineChartData.labels = res.data.labels;
  //     res.data.datasets.map((row: any) => {
  //       this.lineChartData.datasets.push({
  //         data: row.data,
  //         label: row.label,
  //         borderColor: 'rgba(255, 99, 71,1)',
  //         fill: 'origin',
  //       });
  //     });
  //     this.chart?.render();
  //   });
  // }

  ngOnDestroy(): void {
    this.onServiceIdChangedSubscription.unsubscribe();
    this.onDateChangedSubscription.unsubscribe();
  }

  // Initialisation Angular ChartJS :
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartType: ChartType = 'line';
  public lineChartData!: ChartConfiguration['data'];
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },
    plugins: {},
  };
}
