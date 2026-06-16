import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Portal } from './portal/portal';
import { NoAuthGuard } from '../../guards/no-auth-guard';

const routes: Routes = [
  {
    path: '',
    component: Portal,
    canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}