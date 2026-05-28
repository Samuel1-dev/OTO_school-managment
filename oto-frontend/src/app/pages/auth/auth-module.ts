import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { Login } from './login/login';
import { InscriptionEcole } from './inscription-ecole/inscription-ecole';
import { InscriptionParent } from './inscription-parent/inscription-parent';
import { ChangerMotDePasse } from './changer-mot-de-passe/changer-mot-de-passe';

@NgModule({
  declarations: [Login, InscriptionEcole, InscriptionParent, ChangerMotDePasse],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
