import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './pages/home/dashboard.component';
import { ScoreboardComponent } from './components/shared/scoreboard/scoreboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsServicesComponent } from './pages/detailServices/detailsservices.component';
import { StackedbarComponent } from './components/shared/stackedbar/stackedbar.component';
import { ClassementComponent } from './pages/classement/classement.component';
import { ScoreboardTotalyComponent } from './components/shared/scoreboard-totaly/scoreboard-totaly.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { GroupserviceComponent } from './pages/administration/groupservice/groupservice.component';
import { PopupErrorComponent } from './pages/administration/popup-error/popup-error.component';
import { PopupValidateComponent } from './pages/administration/popup-validate/popup-validate.component';
import { AssociateGroupserviceComponent } from './pages/administration/groupservice/associate-groupservice/associate-groupservice.component';
import { CreateGroupComponent } from './pages/administration/groupservice/create-group/create-group.component';
import { UtilisateurComponent } from './pages/administration/utilisateur/utilisateur.component';
import { ServiceComponent } from './pages/administration/service/service.component';
import { PopupAdminComponent } from './pages/detailServices/popup-admin/popup-admin.component';
import { DialogComponent } from './components/shared/dialog-component/dialog-component.component';
import { DialogEditComponent } from './components/shared/dialog-edit/dialog-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ScoreboardComponent,
    StackedbarComponent,
    ClassementComponent,
    ScoreboardTotalyComponent,
    AdministrationComponent,
    GroupserviceComponent,
    PopupErrorComponent,
    PopupValidateComponent,
    AssociateGroupserviceComponent,
    CreateGroupComponent,
    UtilisateurComponent,
    ServiceComponent,
    PopupAdminComponent,
    DetailsServicesComponent,
    DialogComponent,
    DialogEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgChartsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatChipsModule,
    CdkDropList,
    CdkDrag,
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatTooltipModule,
  ],
  providers: [provideNativeDateAdapter()],
  bootstrap: [AppComponent],
})
export class AppModule {}
