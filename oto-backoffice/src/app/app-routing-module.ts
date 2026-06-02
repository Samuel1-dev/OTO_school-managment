import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

const routes: Routes = [
  {
    path: 'backoffice',
    loadChildren: () => import('./backoffice/backoffice.module')
      .then(m => m.BackofficeModule)
  },
  {
    path: '',
    redirectTo: '/backoffice/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/backoffice/login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
