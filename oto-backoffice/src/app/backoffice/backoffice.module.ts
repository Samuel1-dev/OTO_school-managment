import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { Backoffice } from './backoffice';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';

import { AuthInterceptor } from '../service/auth.interceptor';

@NgModule({
  declarations: [
    Backoffice,
    Login,
    Dashboard,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BackofficeRoutingModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class BackofficeModule { }