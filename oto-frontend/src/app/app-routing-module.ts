import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/landing/landing-module').then((m) => m.LandingModule),
  },
  {
    path: 'portal',
    loadChildren: () =>
      import('./pages/portal/portal-module').then((m) => m.PortalModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard-module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}