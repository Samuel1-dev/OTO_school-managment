import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing-module';
import { Portal } from './portal/portal';

@NgModule({
  declarations: [Portal],
  imports: [
    CommonModule,
    PortalRoutingModule,
  ],
})
export class PortalModule {}