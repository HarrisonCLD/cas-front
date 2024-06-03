import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';

// services :
import { StatistiquesService } from '../../services/statistiques.service';
import { WebService } from '../../services/webservice.service';

// interfaces :
import { Service } from '../../interfaces/service.interface';

@Component({
  selector: 'detailsservices',
  templateUrl: './detailsservices.component.html',
  styleUrl: './detailsservices.component.scss',
})
export class DetailsServicesComponent implements OnInit {
  public statService = inject(StatistiquesService);
  public webService = inject(WebService);

  // filter search name :
  public serviceName!: string;

  // list and filter about services :
  public filteredListServices!: Service[];

  // subscribe date and data changed :
  public dataChangedAccess: Subject<any> = new Subject();
  public dataChangedUnique: Subject<any> = new Subject();
  public fullscreenChanged: Subject<boolean> = new Subject();

  // informations about administrator :
  public toggleAdminWindow: boolean = false;

  // toggle date peaker :
  public datepicker: boolean = true;
  public fullscreen: boolean = false;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.webService.get_initial_date().then(() => {
      this.webService.initialCreationDate = {
        datedebut: new Date(this.webService.date.datedebut),
        datefin: new Date(this.webService.date.datefin),
      };
    });

    this.webService
      .getServices()
      .then(
        () => (this.filteredListServices = this.webService.listServices.slice())
      );

    this.route.params.subscribe((params: Params) => {
      this.webService.serviceSelectedAccess = {
        id: parseInt(params['id']),
      };
      this.webService.serviceSelectedUnique = {
        id: parseInt(params['id']),
      };
      setTimeout(() => {
        this.webService.get_access_service().then(() => {
          this.dataChangedAccess.next(this.webService.serviceSelectedAccess);
          if (this.webService.serviceSelectedAccess.name) {
            this.serviceName = this.webService.serviceSelectedAccess.name;
          }
        });
      }, 100);
      setTimeout(() => {
        this.webService.get_unique_access_service().then(() => {
          this.dataChangedUnique.next(this.webService.serviceSelectedUnique);
        });
      }, 200);
    });
    setTimeout(() => this.scrollToSelectedElement(), 600);
  }

  onDateChange() {
    this.webService
      .get_access_service()
      .then(() =>
        this.dataChangedAccess.next(this.webService.serviceSelectedAccess)
      );
    this.webService.get_unique_access_service().then(() => {
      this.dataChangedUnique.next(this.webService.serviceSelectedUnique);
    });
  }

  set_datepicker() {
    this.datepicker = !this.datepicker;
  }

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
    this.fullscreenChanged.next(this.fullscreen);
  }

  scrollToSelectedElement() {
    const selectedElement = document.getElementById(
      `_${this.webService.serviceSelectedAccess.id}`
    );
    if (selectedElement)
      selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  get_info_admin(event: any) {
    this.toggleAdminWindow = !this.toggleAdminWindow;
  }

  get_initial_date() {
    this.webService.date = { ...this.webService.initialCreationDate };
    this.onDateChange();
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
    this.toggleFullscreen();
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
    this.serviceName = '';
    this.webService.serviceSelectedAccess.name = '';
  }
}
