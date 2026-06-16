import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { EcoleService } from '../../../services/ecole';
import { NoteService } from '../../../services/note';
import { AbsenceService } from '../../../services/absence';
import { EpreuveService } from '../../../services/epreuve';
import { AnnonceService } from '../../../services/annonce';
import { EmploiTempsService } from '../../../services/emploi-temps';
import { EleveService } from '../../../services/eleve';
import { MatiereService } from '../../../services/matiere';
import { SalleService } from '../../../services/salle';
import { ConfigAcademiqueService } from '../../../services/config-academique';
import { NavItem } from '../../../shared/components/sidebar/sidebar';
import { ClasseService } from '../../../services/classe';

@Component({
  selector: 'app-professeur',
  standalone: false,
  templateUrl: './professeur.html',
  styleUrls: ['./professeur.scss'],
})
export class Professeur implements OnInit {
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

  annonces: any[] = [];
  epreuves: any[] = [];
  emploisTemps: any[] = [];
  absences: any[] = [];
  matieres: any[] = [];
  salles: any[] = [];
  eleves: any[] = [];
  config: any = null;
  libelles: string[] = [];
  periodes: string[] = [];
  mesMatieres: any[] = [];
  classes: any[]= [];


  showSaisieNotes = false;
  showAddEpreuve = false;
  formError = '';
  formSuccess = '';
  searchEpreuve = '';
  selectedMatiere = '';

  selectedSalleId = '';
  selectedPeriode = '';

  notesData: {
    libelle: string;
    eleves: { eleve_id: string; nom: string; prenom: string; valeur: number }[];
  }[] = [];

  epreuveForm = {
    titre: '',
    matiere_id: '',
    classe_id: '',
    format: 'pdf' as 'pdf' | 'image',
    description: '',
  };

  selectedFile: File | null = null;
  uploadProgress = 0;
  isUploading = false;

  navItems: NavItem[] = [
    { id: 'vue-generale', label: 'Vue Générale', icon: 'dashboard' },
    { id: 'notes', label: 'Saisie des Notes', icon: 'grade' },
    { id: 'absences', label: 'Absences', icon: 'event_busy' },
    { id: 'emploi-temps', label: 'Emploi du Temps', icon: 'schedule' },
    { id: 'epreuves', label: 'Bibliothèque', icon: 'local_library' },
    { id: 'annonces', label: 'Annonces', icon: 'campaign' },
  ];

  constructor(
    private authService: AuthService,
    private ecoleService: EcoleService,
    private noteService: NoteService,
    private absenceService: AbsenceService,
    private epreuveService: EpreuveService,
    private annonceService: AnnonceService,
    private emploiTempsService: EmploiTempsService,
    private eleveService: EleveService,
    private matiereService: MatiereService,
    private salleService: SalleService,
    private configService: ConfigAcademiqueService,
    private cdr: ChangeDetectorRef,
    private classeService: ClasseService,
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_nom') ?? 'Professeur';
    this.loadEcole();
    this.loadStats();
    this.loadAnnonces();
    this.loadEpreuves();
    this.loadEmploisTemps();
    this.loadAbsences();
    this.loadMatieres();
    this.loadSalles();
    this.loadConfig();
    this.loadMesMatieres();
    this.loadClasses();
  }

  loadMesMatieres(): void {
  this.ecoleService.getMesMatieres().subscribe({
    next: (matieres: string[]) => {
      this.mesMatieres = matieres;
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

onSalleChange(): void {
  if (!this.selectedSalleId) {
    this.eleves = [];
    this.notesData = [];
    this.cdr.detectChanges();
    return;
  }

  console.log('Chargement élèves pour salle:', this.selectedSalleId);

  this.eleveService.getElevesBySalle(this.selectedSalleId).subscribe({
    next: (eleves: any[]) => {
      console.log('Élèves reçus:', eleves);
      this.eleves = [...eleves];
      console.log('notesData avant init:', this.notesData);
      console.log('libelles:', this.libelles);
      this.initNotesData();
      console.log('notesData après init:', JSON.stringify(this.notesData));
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Erreur chargement élèves:', err);
      this.eleves = [];
      this.notesData = [];
      this.cdr.detectChanges();
    },
  });
}
 saisirNotes(): void {
  if (!this.selectedSalleId || !this.selectedPeriode) {
    this.formError = 'Veuillez sélectionner la salle et la période';
    return;
  }

  if (this.eleves.length === 0) {
    this.formError = 'Aucun élève dans cette salle';
    return;
  }

  this.formError = '';
  this.isSubmitting = true;

  const payload = {
    matiere: this.mesMatieres[0] ?? '',
    salle_id: this.selectedSalleId,
    trimestre: this.selectedPeriode,
    libelles_notes: this.notesData.map((nd) => ({
      libelle: nd.libelle,
      notes: nd.eleves.map((e) => ({
        eleve_id: e.eleve_id,
        valeur: Number(e.valeur),
      })),
    })),
  };

  this.noteService.saisirNotes(payload).subscribe({
    next: (res: any) => {
      this.isSubmitting = false;
      this.showSaisieNotes = false;
      this.formSuccess = `${res.count} notes enregistrées avec succès !`;
      this.selectedSalleId = '';
      this.eleves = [];
      this.notesData = [];
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

  loadEmploisTemps(): void {
    this.emploiTempsService.getEmploiTempsProf().subscribe({
      next: (emplois: any[]) => {
        this.emploisTemps = [...emplois];
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

  loadMatieres(): void {
    this.matiereService.listMatieres().subscribe({
      next: (matieres: any[]) => {
        this.matieres = [...matieres];
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

  loadConfig(): void {
    this.configService.getLibelles().subscribe({
      next: (data: any) => {
        this.libelles = data.libelles ?? [];
        this.periodes = data.periodes ?? [];
        if (this.periodes.length > 0) {
          this.selectedPeriode = this.periodes[0];
        }
        this.cdr.detectChanges();
      },
    });
  }
trackByIndex(index: number): number {
  return index;
}

initNotesData(): void {
  const data: { libelle: string; eleves: { eleve_id: string; nom: string; prenom: string; valeur: number }[] }[] = [];

  for (const libelle of this.libelles) {
    const section = {
      libelle,
      eleves: [] as { eleve_id: string; nom: string; prenom: string; valeur: number }[],
    };
    for (const e of this.eleves) {
      section.eleves.push({
        eleve_id: e.id,
        nom: e.nom,
        prenom: e.prenom,
        valeur: 0,
      });
    }
    data.push(section);
  }

  this.notesData = [];
  this.cdr.detectChanges();

  setTimeout(() => {
    this.notesData = data;
    this.cdr.detectChanges();
  }, 50);
}

  // Upload fichier épreuve
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.epreuveForm.format = file.type === 'application/pdf' ? 'pdf' : 'image';
    }
  }

  publierEpreuve(): void {
    if (!this.epreuveForm.titre || !this.epreuveForm.matiere_id || !this.selectedFile) {
      this.formError = 'Veuillez remplir tous les champs et sélectionner un fichier';
      return;
    }

    this.formError = '';
    this.isSubmitting = true;

    // Convertir le fichier en base64 pour l'envoyer
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;

      const payload = {
        ...this.epreuveForm,
        fichier_url: base64,
        fichier_nom: this.selectedFile!.name,
      };

      this.epreuveService.publierEpreuve(payload).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.showAddEpreuve = false;
          this.formSuccess = 'Épreuve publiée avec succès';
          this.selectedFile = null;
          this.resetEpreuveForm();
          this.loadEpreuves();
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
    reader.readAsDataURL(this.selectedFile);
  }

  resetEpreuveForm(): void {
    this.epreuveForm = {
      titre: '',
      matiere_id: '',
      classe_id: '',
      format: 'pdf',
      description: '',
    };
    this.selectedFile = null;
    this.formError = '';
  }

  searchEpreuves(): void {
    this.loadEpreuves();
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

  logout(): void {
    this.authService.logout();
  }
}