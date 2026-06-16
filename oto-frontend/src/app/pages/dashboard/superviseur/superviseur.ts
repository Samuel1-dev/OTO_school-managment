import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { EcoleService } from '../../../services/ecole';
import { AbsenceService } from '../../../services/absence';
import { AnnonceService } from '../../../services/annonce';
import { EpreuveService } from '../../../services/epreuve';
import { ClasseService } from '../../../services/classe';
import { SalleService } from '../../../services/salle';
import { EmploiTempsService } from '../../../services/emploi-temps';
import { EleveService } from '../../../services/eleve';
import { NavItem } from '../../../shared/components/sidebar/sidebar';
import { ConfigAcademiqueService } from '../../../services/config-academique';
import { MessageService } from '../../../services/message';
import { MatiereService } from '../../../services/matiere';

@Component({
  selector: 'app-superviseur',
  standalone: false,
  templateUrl: './superviseur.html',
  styleUrls: ['./superviseur.scss'],
})
export class Superviseur implements OnInit {
  sidebarOpen = true;
  activeSection = 'vue-generale';
  ecoleNom = '';
  userName = '';
  isSubmitting = false;

  stats = {
    membres: 0,
    professeurs: 0,
    secretaires: 0,
    superviseurs: 0,
  };

  absences: any[] = [];
  annonces: any[] = [];
  epreuves: any[] = [];
  classes: any[] = [];
  salles: any[] = [];
  emploisTemps: any[] = [];
  eleves: any[] = [];
  membres: any[] = [];
  matieres: any[] = [];
  matieresProf: any[] = [];



  showAddAbsence = false;
  showAddClasse = false;
  showAddSalle = false;
  showAddEmploi = false;
  showAddMatiere = false;
  isSubmittingMatiere = false;

  formError = '';
  formSuccess = '';
  searchEpreuve = '';
  nouvelleMatiereNom = '';
  selectedEmploiFile: File | null = null;

  absenceForm = {
    eleve_id: '',
    duree_heures: 1,
    motif: '',
    justifiee: false,
    date: new Date().toISOString().split('T')[0],
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

  salleForm = {
    classe_id: '',
    option: '',
    annee_academique: '',
    effectif_max: 0,
    prof_principal_id: '',
    professeurs: [] as { user_id: string; matiere: string; coefficient: number }[],
  };

  emploiForm = {
    salle_id: '',
    fichier_pdf_url: '',
    annee_academique: '',
  };

  affectations: any[] = [];
  showAddAffectation = false;
  salleSelectionneeAffectation = '';
  professeursBySalle: any[] = [];

  affectationForm = {
    user_id: '',
    matiere: '',
    coefficient: 1,
  };
  

  config: any = null;
  configForm = {
    type_periode: 'trimestre',
    nombre_periodes: 3,
    nombre_interrogations: 2,
    nombre_devoirs: 2,
  };
  isSubmittingConfig = false;
  libellesPreview: string[] = [];
  periodesPreview: string[] = [];

  navItems: NavItem[] = [
    { id: 'vue-generale', label: 'Vue Générale', icon: 'dashboard' },
    { id: 'absences', label: 'Gestion Absences', icon: 'event_busy' },
    { id: 'classes', label: 'Classes', icon: 'class' },
    { id: 'salles', label: 'Salles', icon: 'meeting_room' },
    { id: 'emploi-temps', label: 'Emploi du Temps', icon: 'schedule' },
    { id: 'epreuves', label: 'Bibliothèque', icon: 'local_library' },
    { id: 'annonces', label: 'Annonces & Com', icon: 'campaign' },
    { id: 'organisation', label: 'Organisation Académique', icon: 'settings' },
    { id: 'affectations', label: 'Affectations Profs', icon: 'assignment_ind' },
    { id: 'matieres', label: 'Matières', icon: 'menu_book' },
  ];

  constructor(
    private authService: AuthService,
    private ecoleService: EcoleService,
    private absenceService: AbsenceService,
    private annonceService: AnnonceService,
    private epreuveService: EpreuveService,
    private classeService: ClasseService,
    private salleService: SalleService,
    private emploiTempsService: EmploiTempsService,
    private eleveService: EleveService,
    private cdr: ChangeDetectorRef,
    private configAcademiqueService: ConfigAcademiqueService,
    private messageService: MessageService,
    private matiereService: MatiereService,
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_nom') ?? 'Superviseur';
    this.loadEcole();
    this.loadStats();
    this.loadAbsences();
    this.loadAnnonces();
    this.loadEpreuves();
    this.loadClasses();
    this.loadSalles();
    this.loadEmploisTemps();
    this.loadEleves();
    this.loadMembres();
    this.loadConfig();
    this.loadMatieres();
  }

  loadEcole(): void {
    this.ecoleService.getEcole().subscribe({
      next: (ecole: any) => {
        this.ecoleNom = ecole.nom;
        this.cdr.detectChanges();
      },
    });
  }

  loadMatieres(): void {
  this.matiereService.listMatieres().subscribe({
    next: (matieres: any[]) => {
      this.matieres = [...matieres];
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

  loadAbsences(): void {
    this.absenceService.getAbsencesEcole().subscribe({
      next: (absences: any[]) => {
        this.absences = [...absences];
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
    this.epreuveService.listEpreuves(this.searchEpreuve).subscribe({
      next: (epreuves: any[]) => {
        this.epreuves = [...epreuves];
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

  

  loadEmploisTemps(): void {
    this.emploiTempsService.listEmploiTemps().subscribe({
      next: (emplois: any[]) => {
        this.emploisTemps = [...emplois];
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

  loadMembres(): void {
  this.ecoleService.getMembres().subscribe({
    next: (membres: any[]) => {
      this.membres = [...membres];
      this.cdr.detectChanges();
    },
  });

  
}

    loadConfig(): void {
      this.configAcademiqueService.getConfig().subscribe({
        next: (config: any) => {
          this.config = config;
          this.configForm = {
            type_periode: config.type_periode,
            nombre_periodes: config.nombre_periodes,
            nombre_interrogations: config.nombre_interrogations,
            nombre_devoirs: config.nombre_devoirs,
          };
          this.updatePreviews();
          this.cdr.detectChanges();
        },
      });
    }

creerMatiere(): void {
  if (!this.nouvelleMatiereNom.trim()) {
    this.formError = 'Veuillez renseigner le nom de la matière';
    return;
  }
  this.isSubmittingMatiere = true;
  this.formError = '';

  this.matiereService.creerMatiere(this.nouvelleMatiereNom).subscribe({
    next: () => {
      this.isSubmittingMatiere = false;
      this.showAddMatiere = false;
      this.nouvelleMatiereNom = '';
      this.formSuccess = 'Matière créée';
      this.loadMatieres();
      this.cdr.detectChanges();
      setTimeout(() => (this.formSuccess = ''), 3000);
    },
    error: (err: any) => {
      this.isSubmittingMatiere = false;
      this.formError = err.error?.message || 'Erreur';
      this.cdr.detectChanges();
    },
  });
}

supprimerMatiere(id: string): void {
  if (!confirm('Supprimer cette matière ?')) return;
  this.matiereService.supprimerMatiere(id).subscribe({
    next: () => {
      this.matieres = this.matieres.filter((m) => m.id !== id);
      this.cdr.detectChanges();
    },
  });
}

onProfesseurChange(): void {
  if (!this.affectationForm.user_id) {
    this.matieresProf = [];
    return;
  }
  this.matiereService.getMatieresByProf(this.affectationForm.user_id).subscribe({
    next: (matieres: any[]) => {
      this.matieresProf = [...matieres];
      this.affectationForm.matiere = '';
      this.cdr.detectChanges();
    },
  });
}

onEmploiFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedEmploiFile = file;
  }
}

getMembresProfs(): any[] {
  return this.membres.filter((m) => m.role === 'professeur');
}

onSalleSelectionneeChange(): void {
  if (!this.salleSelectionneeAffectation) {
    this.professeursBySalle = [];
    return;
  }
  this.salleService.getProfesseursBySalle(this.salleSelectionneeAffectation).subscribe({
    next: (profs: any[]) => {
      this.professeursBySalle = [...profs];
      this.cdr.detectChanges();
    },
  });
}

affecterProfesseur(): void {
  if (!this.salleSelectionneeAffectation || !this.affectationForm.user_id || !this.affectationForm.matiere) {
    this.formError = 'Veuillez remplir tous les champs';
    return;
  }

  this.formError = '';
  this.isSubmitting = true;

  this.salleService.affecterProfesseur(
    this.salleSelectionneeAffectation,
    this.affectationForm,
  ).subscribe({
    next: () => {
      this.isSubmitting = false;
      this.showAddAffectation = false;
      this.formSuccess = 'Professeur affecté avec succès';
      this.affectationForm = { user_id: '', matiere: '', coefficient: 1 };
      this.onSalleSelectionneeChange();
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

retirerProfesseur(user_id: string): void {
  if (!confirm('Retirer ce professeur de la salle ?')) return;
  this.salleService.retirerProfesseur(
    this.salleSelectionneeAffectation,
    user_id,
  ).subscribe({
    next: () => {
      this.formSuccess = 'Professeur retiré';
      this.onSalleSelectionneeChange();
      this.cdr.detectChanges();
      setTimeout(() => (this.formSuccess = ''), 3000);
    },
  });
}

ajouterEmploiTemps(): void {
  if (!this.emploiForm.salle_id || !this.selectedEmploiFile) {
    this.formError = 'Veuillez sélectionner une salle et un fichier';
    return;
  }

  this.formError = '';
  this.isSubmitting = true;

  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result as string;

    const payload = {
      salle_id: this.emploiForm.salle_id,
      fichier_pdf_url: base64,
      annee_academique: this.emploiForm.annee_academique || '2025-2026',
    };

    this.emploiTempsService.ajouterEmploiTemps(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showAddEmploi = false;
        this.formSuccess = 'Emploi du temps ajouté';
        this.emploiForm = { salle_id: '', fichier_pdf_url: '', annee_academique: '' };
        this.selectedEmploiFile = null;
        this.loadEmploisTemps();
        this.cdr.detectChanges();
        setTimeout(() => (this.formSuccess = ''), 3000);
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.formError = err.error?.message || 'Une erreur est survenue';
        this.cdr.detectChanges();
      },
    });
  };
  reader.readAsDataURL(this.selectedEmploiFile);
}

updatePreviews(): void {
  this.libellesPreview = [];
  for (let i = 1; i <= this.configForm.nombre_interrogations; i++) {
    this.libellesPreview.push(`Interrogation ${i}`);
  }
  for (let i = 1; i <= this.configForm.nombre_devoirs; i++) {
    this.libellesPreview.push(`Devoir ${i}`);
  }

  this.periodesPreview = [];
  const label = this.configForm.type_periode === 'trimestre' ? 'Trimestre' : 'Semestre';
  for (let i = 1; i <= this.configForm.nombre_periodes; i++) {
    this.periodesPreview.push(`${label} ${i}`);
  }
}

sauvegarderConfig(): void {
  this.isSubmittingConfig = true;
  this.formError = '';

  this.configAcademiqueService.updateConfig(this.configForm).subscribe({
    next: () => {
      this.isSubmittingConfig = false;
      this.formSuccess = 'Configuration académique sauvegardée !';
      this.loadConfig();
      this.cdr.detectChanges();
      setTimeout(() => (this.formSuccess = ''), 3000);
    },
    error: (err: any) => {
      this.isSubmittingConfig = false;
      this.formError = err.error?.message || 'Une erreur est survenue';
      this.cdr.detectChanges();
    },
  });
}

  enregistrerAbsence(): void {
    if (!this.absenceForm.eleve_id || !this.absenceForm.date) {
      this.formError = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    this.formError = '';
    this.isSubmitting = true;

    this.absenceService.enregistrerAbsence(this.absenceForm).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showAddAbsence = false;
        this.formSuccess = 'Absence enregistrée avec succès';
        this.absenceForm = {
          eleve_id: '',
          duree_heures: 1,
          motif: '',
          justifiee: false,
          date: new Date().toISOString().split('T')[0],
        };
        this.loadAbsences();
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




  creerSalle(): void {
  if (!this.salleForm.classe_id || !this.salleForm.option) {
    this.formError = 'Veuillez remplir tous les champs obligatoires';
    return;
  }

  this.formError = '';
  this.isSubmitting = true;

  // Nettoyer les champs UUID vides
  const payload: any = {
    classe_id: this.salleForm.classe_id,
    option: this.salleForm.option,
    annee_academique: this.salleForm.annee_academique || undefined,
    effectif_max: this.salleForm.effectif_max || undefined,
    professeurs: this.salleForm.professeurs,
  };

  // N'ajouter prof_principal_id que s'il est renseigné
  if (this.salleForm.prof_principal_id) {
    payload.prof_principal_id = this.salleForm.prof_principal_id;
  }

  this.salleService.createSalle(payload).subscribe({
    next: () => {
      this.isSubmitting = false;
      this.showAddSalle = false;
      this.formSuccess = 'Salle créée avec succès';
      this.salleForm = {
        classe_id: '',
        option: '',
        annee_academique: '',
        effectif_max: 0,
        prof_principal_id: '',
        professeurs: [],
      };
      this.loadSalles();
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


  justifierAbsence(id: string): void {
    const motif = prompt('Motif de justification :');
    if (!motif) return;
    this.absenceService.justifierAbsence(id, { motif }).subscribe({
      next: () => {
        this.formSuccess = 'Absence justifiée';
        this.loadAbsences();
        this.cdr.detectChanges();
        setTimeout(() => (this.formSuccess = ''), 3000);
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

  supprimerClasse(id: string): void {
    if (!confirm('Voulez-vous vraiment supprimer cette classe ?')) return;
    this.classeService.deleteClasse(id).subscribe({
      next: () => {
        this.classes = this.classes.filter((c) => c.id !== id);
        this.cdr.detectChanges();
      },
    });
  }

  supprimerSalle(id: string): void {
    if (!confirm('Voulez-vous vraiment supprimer cette salle ?')) return;
    this.salleService.deleteSalle(id).subscribe({
      next: () => {
        this.salles = this.salles.filter((s) => s.id !== id);
        this.cdr.detectChanges();
      },
    });
  }

  searchEpreuves(): void {
    this.loadEpreuves();
  }

  logout(): void {
    this.authService.logout();
  }
}