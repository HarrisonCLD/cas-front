import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  data: any;

  constructor() {}



  // stackedClicked() {

  // this.stacked = !this.stacked;

  // this.barChartOptions!.scales = {
  //   x: {
  //     stacked: this.stacked,
  //     ticks: {
  //       minRotation: 0,
  //       maxRotation: 45,
  //     },
  //   },
  //   y: {
  //     min:10,
  //     stacked: this.stacked,
  //   },
  // };

  // this.barChartOptions!.plugins = {
  //   legend: {
  //     display: true,
  //     labels:{
  //     }
  //   },
  //   datalabels: {
  //     anchor: 'end',
  //     align: 'end',
  //   },
  // };

  // this.chart.render();
  // }
}
