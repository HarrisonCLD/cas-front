import { Component, EventEmitter, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { StatistiquesService } from '../services/statistiques.service';

interface Service {
  id: number;
  name: string;
  active: number | null;
  isDev: number | null;
  isEnded: number | null;
  moyenne: number;
  pick: number;
}

@Component({
  selector: 'listservices',
  templateUrl: './listservices.component.html',
  styleUrl: './listservices.component.scss',
})
export class ListservicesComponent implements OnInit {
  public statService = inject(StatistiquesService);

  // filter search name :
  public serviceName!: string;

  // list and filter about services :
  public listServices: any;
  public filterListServices: any;

  // service selected (id, name and flags):
  public selectedService: Service = {
    id: 0,
    name: '',
    active: null,
    isDev: null,
    isEnded: null,
    moyenne: 0,
    pick: 0,
  };

  // subscribe date and data changed :
  public dataChanged: Subject<any> = new Subject();
  private onDateChangedSubscription!: Subscription;

  // full screen charts :
  public fullScreen: boolean = false;

  // toggle date picker :
  public datePicker: boolean = true;

  constructor(private route: ActivatedRoute) {}

  onDateChange() {
    this.statService.dateChanged.next('date changed');
  }

  set_datePicker() {
    this.datePicker = !this.datePicker;
  }

  fullscreen(value: boolean) {
    this.fullScreen = value;
  }

  ngOnInit() {
    this.statService.get_services().subscribe((res) => {
      this.listServices = res.data.slice();
      this.selectedService.id = this.listServices[1].id;
      this.filterListServices = this.listServices.slice();
    });

    this.route.params.subscribe((params: Params) => {
      this.selectedService.id = params['id'];
      this.statService.get_service(this.selectedService.id).subscribe((res) => {
        this.selectedService = res.data[0];
      });

      this.statService
        .get_access_service(this.selectedService.id)
        .subscribe((res) => {
          res.data.active === 1
            ? (this.selectedService.active = null)
            : (this.selectedService.active = 1);
          res.data.isDev === 0
            ? (this.selectedService.isDev = null)
            : (this.selectedService.isDev = 1);
          res.data.isEnded === 0
            ? (this.selectedService.isEnded = null)
            : (this.selectedService.isEnded = 1);
          this.selectedService.pick = res.data.pick;
          this.selectedService.moyenne = res.data.moyenne;
          this.dataChanged.next(res.data);
        });
    });

    this.onDateChangedSubscription = this.statService.dateChanged.subscribe(
      () => {
        this.statService
          .get_access_service(this.selectedService.id)
          .subscribe((res) => {
            res.data.active
              ? (this.selectedService.active = 1)
              : (this.selectedService.active = null);
            this.selectedService = res.data;
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

  resetSearch() {
    this.serviceName = '';
    this.filterListServices = this.listServices.slice();
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

  ngOnDestroy() {
    this.onDateChangedSubscription.unsubscribe();
  }
}
