import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Parent } from './parent/parent';
import { RoleGuard } from '../../guards/role-guard';
import { Admin } from './admin/admin';
import { Professeur } from './professeur/professeur';
import { Secretaire } from './secretaire/secretaire';
import { Superviseur } from './superviseur/superviseur';
import { AuthGuard } from '../../guards/auth-guard';


const routes: Routes = [
  {
    path: 'admin',
    component: Admin,
    canActivate: [RoleGuard],
    data: { role: 'admin' },
  },
  {
    path: 'professeur',
    component: Professeur,
    canActivate: [RoleGuard],
    data: { role: 'professeur' },
  },
  {
    path: 'secretaire',
    component: Secretaire,
    canActivate: [RoleGuard],
    data: { role: 'secretaire' },
  },
  {
    path: 'superviseur',
    component: Superviseur,
    canActivate: [RoleGuard],
    data: { role: 'superviseur' },
  },
  {
    path: 'parent',
    component: Parent,
    canActivate: [RoleGuard],
    data: { role: 'parent' },
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },

  {
  path: 'autre',
  loadChildren: () =>
    import('./autre/autre-module').then((m) => m.AutreModule),
  canActivate: [AuthGuard],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}