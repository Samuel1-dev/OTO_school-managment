import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Admin } from './admin/admin';
import { Professeur } from './professeur/professeur';
import { Secretaire } from './secretaire/secretaire';
import { Superviseur } from './superviseur/superviseur';
import { Parent } from './parent/parent';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [Admin, Professeur, Secretaire, Superviseur, Parent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
