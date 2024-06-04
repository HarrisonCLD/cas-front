import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/home/dashboard.component';
import { DetailsServicesComponent } from './pages/detailServices/detailsservices.component';
import { ClassementComponent } from './pages/classement/classement.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { GroupserviceComponent } from './pages/administration/groupservice/groupservice.component';
import { isAdminGuard } from './guards/isAdmin.guard';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'services/:id',
    component: DetailsServicesComponent,
  },
  {
    path: 'classement',
    component: ClassementComponent,
  },
  {
    path: 'administration',
    component: AdministrationComponent,
    canActivate: [isAdminGuard],
    children: [
      {
        path: 'group',
        component: GroupserviceComponent,
      },
    ],
  },
  {
    path:'**', redirectTo:'/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
