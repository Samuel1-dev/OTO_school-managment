import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing-module';
import { Landing } from './landing/landing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [Landing],
  imports: [
    CommonModule, 
    LandingRoutingModule,
    FormsModule,
    SharedModule
  
  ],
})
export class LandingModule {}
