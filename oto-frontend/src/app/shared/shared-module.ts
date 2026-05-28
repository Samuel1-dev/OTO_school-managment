import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
