import { Component, EventEmitter, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { StatistiquesService } from '../services/statistiques.service';

interface Service {
  id: number;
  name: string;
  admin: {
    nom: string;
    mail: string;
  };
  active: number | null;
  isDev: number | null;
  isEnded: number | null;
  moyenne: number | null;
  pick: number | null;
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
    id: 477,
    admin: {
      nom: '',
      mail: '',
    },
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
  public listAdmin!: Array<object>;
  public informationsAdmin: boolean = false;
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
          Object.assign(this.selectedService, res.data);
          res.data.isDev === 0
            ? (this.selectedService.isDev = null)
            : (this.selectedService.isDev = 1);
          res.data.isEnded === 0
            ? (this.selectedService.isEnded = null)
            : (this.selectedService.isEnded = 1);
          if (!res.data.isEnded) {
            res.data.active === 1
              ? (this.selectedService.active = null)
              : (this.selectedService.active = 1);
          } else {
            this.selectedService.active = null;
          }
          this.selectedService.pick = res.data.pick;
          this.selectedService.moyenne = res.data.moyenne;
          if (res.data.admin) {
            this.listAdmin = res.data.admin;
          }
          this.dataChanged.next(res.data);
        });
    });

    this.onDateChangedSubscription = this.statService.dateChanged.subscribe(
      () => {
        this.statService
          .get_access_service(this.selectedService.id)
          .subscribe((res) => {
            Object.assign(this.selectedService, res.data);
            res.data.active === 1
              ? (this.selectedService.active = null)
              : (this.selectedService.active = 1);
            this.dataChanged.next(res.data);
            res.data.admin ? (this.listAdmin = res.data.admin) : null;
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
    const arrowview1 = document.querySelector('.arrowtoggle1');
    const arrowview2 = document.querySelector('.arrowtoggle2');
    if (sidenav?.classList.contains('open')) {
      sidenav?.classList.remove('open');
      sidenav?.classList.add('close');
      arrowview1?.classList.remove('active');
      arrowview2?.classList.add('active');
    } else {
      sidenav?.classList.remove('close');
      sidenav?.classList.add('open');
      arrowview2?.classList.remove('active');
      arrowview1?.classList.add('active');
    }
  }

  get_info_admin() {
    this.informationsAdmin = !this.informationsAdmin;
  }

  ngOnDestroy() {
    this.onDateChangedSubscription.unsubscribe();
  }
}
