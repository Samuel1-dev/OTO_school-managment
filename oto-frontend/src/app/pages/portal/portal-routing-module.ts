import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Portal } from './portal/portal';

const routes: Routes = [
  { path: '', component: Portal },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}