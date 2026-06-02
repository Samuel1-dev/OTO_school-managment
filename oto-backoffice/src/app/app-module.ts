import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';

import { App } from './app';
import { BackofficeModule } from './backoffice/backoffice.module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackofficeModule
  ],
  providers: [],
  bootstrap: [
    App
  ]
})
export class AppModule { }
