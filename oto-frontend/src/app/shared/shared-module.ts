import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Services
import { AuthService } from '../services/auth';
import { UserService } from '../services/user';
import { ClasseService } from '../services/classe';
import { SalleService } from '../services/salle';
import { EcoleService } from '../services/ecole';
import { EleveService } from '../services/eleve';
import { MatiereService } from '../services/matiere';
import { NoteService } from '../services/note';
import { AbsenceService } from '../services/absence';
import { PaiementService } from '../services/paiement';
import { EpreuveService } from '../services/epreuve';
import { AnnonceService } from '../services/annonce';
import { EmploiTempsService } from '../services/emploi-temps';
import { UtilService } from './utils/util.service';

// Composants partagés
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { StatCard } from './components/stat-card/stat-card';
import { ConfigAcademiqueService } from '../services/config-academique';
import { MessageService } from '../services/message';
import { RolePersonnaliseService } from '../services/role-personnalise';

@NgModule({
  declarations: [
    Sidebar,
    Header,
    StatCard,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    AuthService,
    UserService,
    ClasseService,
    SalleService,
    EcoleService,
    EleveService,
    MatiereService,
    NoteService,
    AbsenceService,
    PaiementService,
    EpreuveService,
    AnnonceService,
    EmploiTempsService,
    UtilService,
    ConfigAcademiqueService,
    MessageService,
    RolePersonnaliseService,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    Sidebar,
    Header,
    StatCard,
  ],
})
export class SharedModule {}