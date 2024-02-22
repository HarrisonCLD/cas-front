import { Component, OnInit, inject } from '@angular/core';

import { StatistiquesService } from '../services/statistiques.service';
import { UIService } from '../services/ui.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'listservices',
  templateUrl: './listservices.component.html',
  styleUrl: './listservices.component.scss',
})
export class ListservicesComponent implements OnInit {
  public statService = inject(StatistiquesService);

  // Filter Search bar :
  public serviceName!: string;

  // List and filter :
  public listServices: any;
  public filterListServices: any;

  // Data Charts :
  public service: any;

  // Flags Services :
  public serviceActive: number | null = null;
  public serviceDev: number | null = null;
  public serviceStop: number | null = null;

  // Service selected :
  public selectedID!: number;

  // Subscribe date and data changed :
  public dataChanged: Subject<any> = new Subject();
  private onDateChangedSubscription!: Subscription;

  // Date Picker visibility :
  public datePicker: boolean = true;

  constructor(private route: ActivatedRoute) {}

  onDateChange() {
    this.statService.dateChanged.next('date changed');
  }

  set_datePicker() {
    this.datePicker = !this.datePicker;
  }

  ngOnInit() {
    this.statService.get_services().subscribe((res) => {
      this.listServices = res.data;
      this.selectedID = this.listServices[1].id;
      this.filterListServices = this.listServices.slice();
    });

    this.route.params.subscribe((params: Params) => {
      this.selectedID = params['id'];
      this.statService.get_service(this.selectedID).subscribe((res) => {
        this.service = res.data[0];
      });

      this.statService.get_access_service(this.selectedID).subscribe((res) => {
        res.data.active === 1
          ? (this.serviceActive = null)
          : (this.serviceActive = 1);
        res.data.isDev === 0 ? (this.serviceDev = null) : (this.serviceDev = 1);
        res.data.isEnded === 0
          ? (this.serviceStop = null)
          : (this.serviceStop = 1);
        this.dataChanged.next(res.data);
      });
    });

    this.onDateChangedSubscription = this.statService.dateChanged.subscribe(
      () => {
        this.statService
          .get_access_service(this.selectedID)
          .subscribe((res) => {
            res.data.active
              ? (this.serviceActive = null)
              : (this.serviceActive = 1);
            this.dataChanged.next(res.data);
          });
      }
    );
  }

  get_searchChange(event: any) {
    this.filterListServices = this.listServices.filter((el: any) => {
      return el.name.startsWith(event.target.value);
    });
    this.serviceName = event.target.value;
  }

  set_sidenav() {
    const sidenav = document.querySelector('.sidenav');
    const arrowview = document.querySelector('.arrowtoggle2');
    if (sidenav?.classList.contains('open')) {
      sidenav?.classList.remove('open');
      sidenav?.classList.add('close');
      arrowview?.classList.toggle('active');
    } else {
      sidenav?.classList.remove('close');
      sidenav?.classList.add('open');
      arrowview?.classList.toggle('active');
    }
  }

  resetSearch() {
    this.serviceName = '';
    this.filterListServices = this.listServices.slice();
  }

  ngOnDestroy() {
    this.onDateChangedSubscription.unsubscribe();
  }
}
