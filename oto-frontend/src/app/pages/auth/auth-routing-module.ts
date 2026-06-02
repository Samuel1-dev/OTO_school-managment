import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './login/login';
import { InscriptionEcole } from './inscription-ecole/inscription-ecole';
import { InscriptionParent} from './inscription-parent/inscription-parent';
import { ChangerMotDePasse } from './changer-mot-de-passe/changer-mot-de-passe';

const routes: Routes = [
  { path: 'login',                component: Login },
  { path: 'inscription-ecole',    component: InscriptionEcole},
  { path: 'inscription-parent',   component: InscriptionParent},
  { path: 'changer-mot-de-passe', component: ChangerMotDePasse },
  { path: '',                     redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}