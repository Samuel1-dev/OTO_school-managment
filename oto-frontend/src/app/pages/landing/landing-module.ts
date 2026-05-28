import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing-module';
import { Landing } from './landing/landing';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [Landing],
  imports: [
    CommonModule, 
    LandingRoutingModule,
    FormsModule,
  
  ],
})
export class LandingModule {}
