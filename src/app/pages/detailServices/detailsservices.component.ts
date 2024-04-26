import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

// services :
import { StatistiquesService } from '../../services/statistiques.service';
import { WebService } from '../../services/webservice.service';

// interfaces :
import { Service } from '../../interfaces/service.interface';

// helpers :
import { openErrorSnackBar } from '../../helpers/popup.helper';

@Component({
  selector: 'detailsservices',
  templateUrl: './detailsservices.component.html',
  styleUrl: './detailsservices.component.scss',
})
export class DetailsServicesComponent implements OnInit {
  public statService = inject(StatistiquesService);
  private webService = inject(WebService);

  // filter search name :
  public serviceName!: string;

  // list and filter about services :
  public filteredListServices!: Service[];

  // service selected (id, name and flags) (default value):
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
    peak: 0,
    total: 0,
    datasets: [],
    new: 0,
  };

  // subscribe date and data changed :
  public dataChanged: Subject<any> = new Subject();
  private onDateChangedSubscription!: Subscription;

  // informations about administrator :
  public listAdmin!: object[];
  public informationsAdmin: boolean = false;
  public fullScreen: boolean = false;

  // toggle date peaker :
  public datepicker: boolean = true;

  constructor(private route: ActivatedRoute, private _snackBar: MatSnackBar) {}

  async ngOnInit() {
    this.statService.get_initial_date().subscribe((res: any) => {
      const { datedebut, datefin } = res.data;
      if (!datedebut || !datefin) {
        openErrorSnackBar(this._snackBar);
        return;
      }
      this.statService.initialCreationDate = {
        datedebut: new Date(datedebut),
        datefin: new Date(datefin),
      };
    });

    // this.statService.get_services().subscribe((res) => {
    //   const services = res.data;
    //   this.listServices = services.slice();
    //   this.selectedService.id = services[1].id;
    //   this.filterListServices = services.slice();
    // });

    this.route.params.subscribe((params: Params) => {
      this.selectedService.id = params['id'];

      // this.statService
      //   .get_service(this.selectedService.id)
      //   .subscribe((res: any) => (this.selectedService = res.data[0]));

      this.webService.getService(this.selectedService.id);

      this.statService
        .get_access_service(this.selectedService.id)
        .subscribe((res) => {
          Object.assign(this.selectedService, res.data);
          this.selectedService.isDev = res.data.isDev === 0 ? null : 1;
          this.selectedService.isEnded = res.data.isEnded === 0 ? null : 1;
          this.selectedService.active = res.data.isEnded
            ? null
            : res.data.active === 1
            ? null
            : 1;

          const total = (this.selectedService.datasets || [])
            .flatMap((row: any) => row.data)
            .reduce((acc: any, curr: any) => acc + curr, 0);

          this.selectedService.total = total.toLocaleString('fr-FR');
          this.selectedService.peak = res.data.pick.toLocaleString('fr-FR');
          this.selectedService.moyenne =
            res.data.moyenne.toLocaleString('fr-FR');

          this.listAdmin = res.data.admin || [];
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
            const total =
              this.selectedService.datasets
                ?.flatMap((row: any) => row.data)
                .reduce((acc: any, curr: any) => acc + curr, 0) || 0;
            this.selectedService.total = total.toLocaleString('fr-FR');
            this.selectedService.peak = res.data.pick.toLocaleString('fr-FR');
            this.selectedService.moyenne =
              res.data.moyenne.toLocaleString('fr-FR');
            this.dataChanged.next(res.data);
            res.data.admin ? (this.listAdmin = res.data.admin) : null;
          });
      }
    );
    this.webService
      .getServices()
      .then((res: any) => (this.filteredListServices = res.slice()));
  }

  onDateChange() {
    this.statService.dateChanged.next('date changed');
  }

  set_datepicker() {
    this.datepicker = !this.datepicker;
  }

  fullscreen(value: boolean) {
    this.fullScreen = value;
  }

  get_info_admin() {
    this.informationsAdmin = !this.informationsAdmin;
  }

  get_initial_date() {
    this.statService.date = this.statService.initialCreationDate;
    this.statService.dateChanged.next('');
  }

  get_searchChange(event: any) {
    this.filteredListServices = this.webService.listServices.filter(
      (el: any) => {
        return el.name.startsWith(event.target.value);
      }
    );
    this.serviceName = event.target.value;
  }

  resetSearch() {
    this.serviceName = '';
    this.filteredListServices = this.webService.listServices.slice();
  }

  openSideNav() {
    const sidenav = document.querySelector('.sidenav') as HTMLElement;
    const arrowview1 = document.querySelector('.arrowtoggle1') as HTMLElement;
    const arrowview2 = document.querySelector('.arrowtoggle2') as HTMLElement;
    const isOpen = sidenav?.classList.contains('open');
    isOpen
      ? this.closeSidenav(sidenav, arrowview1, arrowview2)
      : this.openSidenav(sidenav, arrowview1, arrowview2);
  }

  private closeSidenav(
    sidenav: HTMLElement | null,
    arrowview1: HTMLElement | null,
    arrowview2: HTMLElement | null
  ) {
    sidenav?.classList.remove('open');
    sidenav?.classList.add('close');
    arrowview1?.classList.remove('active');
    arrowview2?.classList.add('active');
  }

  private openSidenav(
    sidenav: HTMLElement | null,
    arrowview1: HTMLElement | null,
    arrowview2: HTMLElement | null
  ) {
    sidenav?.classList.remove('close');
    sidenav?.classList.add('open');
    arrowview2?.classList.remove('active');
    arrowview1?.classList.add('active');
  }

  ngOnDestroy() {
    this.onDateChangedSubscription.unsubscribe();
  }
}
