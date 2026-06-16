import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { InscriptionEcole } from './inscription-ecole/inscription-ecole';
import { ChangerMotDePasse } from './changer-mot-de-passe/changer-mot-de-passe';
import { AuthGuard } from '../../guards/auth-guard';
import { NoAuthGuard } from '../../guards/no-auth-guard';

const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'inscription-ecole',
    component: InscriptionEcole,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'changer-mot-de-passe',
    component: ChangerMotDePasse,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}