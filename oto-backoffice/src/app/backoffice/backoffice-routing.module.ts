import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';

const routes: Routes = [
  {
    path: 'login',
    component: Login,
    data: {
      title: 'Connexion - Back Office'
    }
  },
  {
    path: 'dashboard',
    component: Dashboard,
    data: {
      title: 'Tableau de bord - Back Office'
    }
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BackofficeRoutingModule { }
