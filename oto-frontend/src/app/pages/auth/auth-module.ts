import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { AuthRoutingModule } from './auth-routing-module';
import { Login } from './login/login';
import { InscriptionEcole } from './inscription-ecole/inscription-ecole';
import { ChangerMotDePasse } from './changer-mot-de-passe/changer-mot-de-passe';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [
    Login,
    InscriptionEcole,
    ChangerMotDePasse,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    AuthRoutingModule,
    SharedModule
  ],
})
export class AuthModule {}