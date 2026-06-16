import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared-module';
import { Autre } from './autre';

const routes: Routes = [{ path: '', component: Autre }];

@NgModule({
  declarations: [Autre],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class AutreModule {}