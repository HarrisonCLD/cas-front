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
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScoreboardComponent } from './shared/scoreboard/scoreboard.component';
import { UnitestatComponent } from './shared/unitestat/unitestat.component';
import { BarChartComponent } from './shared/barchart/barchart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListservicesComponent } from './listservices/listservices.component';
import { LinechartComponent } from './shared/linechart/linechart.component';
import { StackedbarComponent } from './shared/stackedbar/stackedbar.component';
import { ClassementComponent } from './classement/classement.component';
import { ScoreboardTotalyComponent } from './shared/scoreboard-totaly/scoreboard-totaly.component';
import { AdministrationComponent } from './administration/administration.component';
import { GroupserviceComponent } from './administration/groupservice/groupservice.component';
import { PopupErrorComponent } from './administration/popup-error/popup-error.component';
import { PopupValidateComponent } from './administration/popup-validate/popup-validate.component';
import { DialogGroupServiceComponent } from './administration/groupservice/create-group/dialog-group-service/dialog-group-service.component';
import { AssociateGroupserviceComponent } from './administration/groupservice/associate-groupservice/associate-groupservice.component';
import { CreateGroupComponent } from './administration/groupservice/create-group/create-group.component';
import { DialogEditLabelComponent } from './administration/groupservice/create-group/dialog-edit-label/dialog-edit-label.component';
import { UtilisateurComponent } from './administration/utilisateur/utilisateur.component';
import { ServiceComponent } from './administration/service/service.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ScoreboardComponent,
    UnitestatComponent,
    BarChartComponent,
    ListservicesComponent,
    LinechartComponent,
    StackedbarComponent,
    ClassementComponent,
    ScoreboardTotalyComponent,
    AdministrationComponent,
    GroupserviceComponent,
    PopupErrorComponent,
    PopupValidateComponent,
    DialogGroupServiceComponent,
    AssociateGroupserviceComponent,
    CreateGroupComponent,
    DialogEditLabelComponent,
    UtilisateurComponent,
    ServiceComponent,
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
