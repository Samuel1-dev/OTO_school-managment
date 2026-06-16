import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { EcoleService } from '../../../services/ecole';
import { EleveService } from '../../../services/eleve';
import { PaiementService } from '../../../services/paiement';
import { AnnonceService } from '../../../services/annonce';
import { EpreuveService } from '../../../services/epreuve';
import { ClasseService } from '../../../services/classe';
import { SalleService } from '../../../services/salle';
import { NavItem } from '../../../shared/components/sidebar/sidebar';
import { NoteService } from '../../../services/note';
import { ConfigAcademiqueService } from '../../../services/config-academique';
import { MessageService } from '../../../services/message';

@Component({
  selector: 'app-secretaire',
  standalone: false,
  templateUrl: './secretaire.html',
  styleUrls: ['./secretaire.scss'],
})
export class Secretaire implements OnInit {
  sidebarOpen = true;
  activeSection = 'vue-generale';
  ecoleNom = '';
  userName = '';
  isSubmitting = false;
  isSubmittingTranche = false;

  stats = {
    membres: 0,
    professeurs: 0,
    secretaires: 0,
    superviseurs: 0,
  };

  eleves: any[] = [];
  classes: any[] = [];
  salles: any[] = [];
  scolarite: any[] = [];
  annonces: any[] = [];
  epreuves: any[] = [];
  notesParSalle: any[] = [];
  salleSelectionneeNotes = '';
  isLoadingNotes = false;
  libelles: string[] = [];
  periodes: string[] = [];
  matieresDisponibles: any[] = [];

  showAddEleve = false;
  showAddClasse = false;
  showAddTranche = false;
  formError = '';
  formSuccess = '';
  trimestreSelectionneeNotes = '';
  matiereSelectionneeNotes = '';

  eleveForm = {
    nom: '',
    prenom: '',
    sexe: 'masculin' as 'masculin' | 'feminin',
    npi: '',
    date_naissance: '',
    lieu_naissance: '',
    quartier: '',
    nom_parent: '',
    contact_parent: '',
    email_parent: '',
    profession_parent: '',
    salle_id: '',
  };

  classeForm = {
    nom: '',
    scolarite_totale: 0,
    tranches: [
      { numero: 1, montant: 0, date_limite: '' },
      { numero: 2, montant: 0, date_limite: '' },
      { numero: 3, montant: 0, date_limite: '' },
    ],
  };

  trancheForm: {
    classe_id: string;
    tranches: { numero: number; montant: number; date_limite: string }[];
  } = {
    classe_id: '',
    tranches: [
      { numero: 1, montant: 0, date_limite: '' },
      { numero: 2, montant: 0, date_limite: '' },
      { numero: 3, montant: 0, date_limite: '' },
    ],
  };

  selectedClasseId = '';

  navItems: NavItem[] = [
    { id: 'vue-generale', label: 'Vue Générale', icon: 'dashboard' },
    { id: 'inscription', label: 'Inscription Élève', icon: 'person_add' },
    { id: 'scolarite', label: 'Scolarité', icon: 'payments' },
    { id: 'epreuves', label: 'Bibliothèque', icon: 'local_library' },
    { id: 'annonces', label: 'Annonces & Com', icon: 'campaign' },
    { id: 'notes', label: 'Notes', icon: 'grade' },
  ];


  constructor(
    private authService: AuthService,
    private ecoleService: EcoleService,
    private eleveService: EleveService,
    private paiementService: PaiementService,
    private annonceService: AnnonceService,
    private epreuveService: EpreuveService,
    private classeService: ClasseService,
    private salleService: SalleService,
    private cdr: ChangeDetectorRef,
    private noteService: NoteService,
    private configAcademiqueService: ConfigAcademiqueService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_nom') ?? 'Secrétaire';
    this.loadEcole();
    this.loadStats();
    this.loadEleves();
    this.loadClasses();
    this.loadSalles();
    this.loadScolarite();
    this.loadAnnonces();
    this.loadEpreuves();
    this.loadConfig();
  }

  loadConfig(): void {
  this.configAcademiqueService.getLibelles().subscribe({
    next: (data: any) => {
      this.libelles = data.libelles ?? [];
      this.periodes = data.periodes ?? [];
      this.cdr.detectChanges();
    },
  });
}

  loadEcole(): void {
    this.ecoleService.getEcole().subscribe({
      next: (ecole: any) => {
        this.ecoleNom = ecole.nom;
        this.cdr.detectChanges();
      },
    });
  }

  loadStats(): void {
    this.ecoleService.getStatistiques().subscribe({
      next: (stats: any) => {
        this.stats = { ...stats };
        this.cdr.detectChanges();
      },
    });
  }

  loadEleves(): void {
    this.eleveService.listEleves().subscribe({
      next: (eleves: any[]) => {
        this.eleves = [...eleves];
        this.cdr.detectChanges();
      },
    });
  }

  loadClasses(): void {
    this.classeService.listClasses().subscribe({
      next: (classes: any[]) => {
        this.classes = [...classes];
        this.cdr.detectChanges();
      },
    });
  }

  loadSalles(): void {
    this.salleService.listSalles().subscribe({
      next: (salles: any[]) => {
        this.salles = [...salles];
        this.cdr.detectChanges();
      },
    });
  }

  loadScolarite(): void {
    this.paiementService.getSuiviScolariteEcole().subscribe({
      next: (data: any[]) => {
        this.scolarite = [...data];
        this.cdr.detectChanges();
      },
    });
  }

  loadAnnonces(): void {
    this.annonceService.listAnnonces().subscribe({
      next: (annonces: any[]) => {
        this.annonces = [...annonces];
        this.cdr.detectChanges();
      },
    });
  }

  loadEpreuves(): void {
    this.epreuveService.listEpreuves().subscribe({
      next: (epreuves: any[]) => {
        this.epreuves = [...epreuves];
        this.cdr.detectChanges();
      },
    });
  }
loadNotesParSalle(): void {
  if (!this.salleSelectionneeNotes) return;

  // Charger les matières disponibles pour cette salle
  this.noteService.getMatieresParSalle(this.salleSelectionneeNotes).subscribe({
    next: (matieres: string[]) => {
      this.matieresDisponibles = matieres;
      this.cdr.detectChanges();
    },
  });

  if (!this.trimestreSelectionneeNotes) return;

  this.isLoadingNotes = true;
  this.noteService.getNotesBySalleCompletes(
    this.salleSelectionneeNotes,
    this.trimestreSelectionneeNotes,
    this.matiereSelectionneeNotes,
  ).subscribe({
    next: (data: any[]) => {
      this.notesParSalle = [...data];
      this.isLoadingNotes = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.isLoadingNotes = false;
      this.cdr.detectChanges();
    },
  });
}
getMatieresList(): string[] {
  if (this.notesParSalle.length === 0) return [];
  const matieres = new Set<string>();
  this.notesParSalle.forEach((e) => {
    Object.keys(e.matieres).forEach((m) => matieres.add(m));
  });
  return Array.from(matieres).sort();
}

getNoteEleve(eleve: any, matiere: string, libelle: string): string {
  const notes = eleve.matieres?.[matiere];
  if (!notes) return '—';
  const note = notes.find((n: any) => n.libelle === libelle);
  return note ? `${note.valeur}/20` : '—';
}

  getSallesByClasse(classeId: string): any[] {
    return this.salles.filter((s) => s.classe_id === classeId);
  }

  inscrireEleve(): void {
    if (
      !this.eleveForm.nom ||
      !this.eleveForm.prenom ||
      !this.eleveForm.date_naissance ||
      !this.eleveForm.lieu_naissance ||
      !this.eleveForm.nom_parent ||
      !this.eleveForm.contact_parent ||
      !this.eleveForm.salle_id
    ) {
      this.formError = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    this.formError = '';
    this.isSubmitting = true;

    this.eleveService.createEleve(this.eleveForm).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        this.showAddEleve = false;
        this.formSuccess = `Élève inscrit ! Matricule : ${res.matricule}`;
        this.resetEleveForm();
        this.loadEleves();
        this.cdr.detectChanges();
        setTimeout(() => (this.formSuccess = ''), 5000);
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.formError = err.error?.message || 'Une erreur est survenue';
        this.cdr.detectChanges();
      },
    });
  }

  // Enregistrer un paiement (solder une tranche)
enregistrerPaiement(eleveId: string, trancheId: string): void {
  const montant = prompt('Montant payé (FCFA) :');
  if (!montant) return;

  this.paiementService.enregistrerPaiement({
    eleve_id: eleveId,
    tranche_id: trancheId,
    montant: Number(montant),
  }).subscribe({
    next: () => {
      this.formSuccess = 'Paiement enregistré avec succès';
      this.loadScolarite();
      this.cdr.detectChanges();
      setTimeout(() => (this.formSuccess = ''), 3000);
    },
    error: (err: any) => {
      this.formError = err.error?.message || 'Une erreur est survenue';
      this.cdr.detectChanges();
    },
  });
}

// Modifier une classe
classeEditForm: any = null;
showEditClasse = false;

ouvrirEditClasse(classe: any): void {
  this.classeEditForm = {
    id: classe.id,
    nom: classe.nom,
    scolarite_totale: classe.scolarite_totale,
    tranches: classe.tranches?.length > 0 ? [...classe.tranches] : [
      { numero: 1, montant: 0, date_limite: '' },
      { numero: 2, montant: 0, date_limite: '' },
      { numero: 3, montant: 0, date_limite: '' },
    ],
  };
  this.showEditClasse = true;
}

modifierClasse(): void {
  if (!this.classeEditForm.nom) {
    this.formError = 'Veuillez renseigner le nom de la classe';
    return;
  }

  this.formError = '';
  this.isSubmitting = true;

  this.classeService.updateClasse(this.classeEditForm.id, {
    nom: this.classeEditForm.nom,
    scolarite_totale: this.classeEditForm.scolarite_totale,
    tranches: this.classeEditForm.tranches,
  }).subscribe({
    next: () => {
      this.isSubmitting = false;
      this.showEditClasse = false;
      this.classeEditForm = null;
      this.formSuccess = 'Classe modifiée avec succès';
      this.loadClasses();
      this.cdr.detectChanges();
      setTimeout(() => (this.formSuccess = ''), 3000);
    },
    error: (err: any) => {
      this.isSubmitting = false;
      this.formError = err.error?.message || 'Une erreur est survenue';
      this.cdr.detectChanges();
    },
  });
}

  creerClasse(): void {
    if (!this.classeForm.nom) {
      this.formError = 'Veuillez renseigner le nom de la classe';
      return;
    }

    this.formError = '';
    this.isSubmitting = true;

    this.classeService.createClasse(this.classeForm).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showAddClasse = false;
        this.formSuccess = 'Classe créée avec succès';
        this.classeForm = {
          nom: '',
          scolarite_totale: 0,
          tranches: [
            { numero: 1, montant: 0, date_limite: '' },
            { numero: 2, montant: 0, date_limite: '' },
            { numero: 3, montant: 0, date_limite: '' },
          ],
        };
        this.loadClasses();
        this.cdr.detectChanges();
        setTimeout(() => (this.formSuccess = ''), 3000);
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.formError = err.error?.message || 'Une erreur est survenue';
        this.cdr.detectChanges();
      },
    });
  }

  contacterParent(eleveId: string): void {
  const sujet = prompt('Sujet du message :') ?? 'Message de l\'école';
  const message = prompt('Message à envoyer au parent :');
  if (!message) return;

  this.messageService.envoyerMessage(eleveId, {
    contenu: message,
    sujet,
  }).subscribe({
    next: () => {
      this.formSuccess = 'Message envoyé au parent';
      this.cdr.detectChanges();
      setTimeout(() => (this.formSuccess = ''), 3000);
    },
  });
}

  resetEleveForm(): void {
    this.eleveForm = {
      nom: '',
      prenom: '',
      sexe: 'masculin',
      npi: '',
      date_naissance: '',
      lieu_naissance: '',
      quartier: '',
      nom_parent: '',
      contact_parent: '',
      email_parent: '',
      profession_parent: '',
      salle_id: '',
    };
    this.selectedClasseId = '';
    this.formError = '';
  }

  logout(): void {
    this.authService.logout();
  }
}