import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ListservicesComponent } from './listservices/listservices.component';
import { ClassementComponent } from './classement/classement.component';
import { AdministrationComponent } from './administration/administration.component';
import { GroupserviceComponent } from './administration/groupservice/groupservice.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'services/:id',
    component: ListservicesComponent,
  },
  {
    path: 'classement',
    component: ClassementComponent,
  },
  {
    path: 'administration',
    component: AdministrationComponent,
    children: [
      {
        path: 'group',
        component: GroupserviceComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
