import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing-module';
import { Portal } from './portal/portal';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [Portal],
  imports: [
    CommonModule,
    PortalRoutingModule,
    SharedModule
  ],
})
export class PortalModule {}