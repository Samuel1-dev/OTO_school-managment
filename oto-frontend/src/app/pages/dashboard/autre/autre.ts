import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { EcoleService } from '../../../services/ecole';
import { AbsenceService } from '../../../services/absence';
import { PaiementService } from '../../../services/paiement';
import { AnnonceService } from '../../../services/annonce';
import { EpreuveService } from '../../../services/epreuve';
import { ClasseService } from '../../../services/classe';
import { SalleService } from '../../../services/salle';
import { EleveService } from '../../../services/eleve';
import { EmploiTempsService } from '../../../services/emploi-temps';
import { MessageService } from '../../../services/message';
import { NoteService } from '../../../services/note';
import { ConfigAcademiqueService } from '../../../services/config-academique';
import { NavItem } from '../../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-autre',
  standalone: false,
  templateUrl: './autre.html',
  styleUrls: ['./autre.scss'],
})
export class Autre implements OnInit {
  sidebarOpen = true;
  activeSection = '';
  ecoleNom = '';
  userName = '';
  permissions: string[] = [];
  isSubmitting = false;
  isSubmittingTranche = false;
  formError = '';
  formSuccess = '';

  // Données
  absences: any[] = [];
  eleves: any[] = [];
  classes: any[] = [];
  salles: any[] = [];
  annonces: any[] = [];
  epreuves: any[] = [];
  emploisTemps: any[] = [];
  scolarite: any[] = [];
  notesParSalle: any[] = [];
  libelles: string[] = [];
  periodes: string[] = [];

  // Scolarité
  showAddClasse = false;
  showAddTranche = false;
  showEditClasse = false;
  classeEditForm: any = null;
  selectedClasseId = '';
  salleSelectionneeNotes = '';
  isLoadingNotes = false;

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

  // Inscription élève
  showAddEleve = false;
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

  // Absences
  showAddAbsence = false;
  absenceForm = {
    eleve_id: '',
    duree_heures: 1,
    motif: '',
    justifiee: false,
    date: new Date().toISOString().split('T')[0],
  };

  // Emploi du temps
  showAddEmploi = false;
  selectedEmploiFile: File | null = null;
  emploiForm = {
    salle_id: '',
    annee_academique: '',
    fichier_pdf_url: '',
  };

  // Annonces
  showAddAnnonce = false;
  annonceForm: { titre: string; contenu: string; cible: 'tous' | 'membres' | 'parents' } = {
    titre: '',
    contenu: '',
    cible: 'tous',
  };

  navItems: NavItem[] = [];

  constructor(
    private authService: AuthService,
    private ecoleService: EcoleService,
    private absenceService: AbsenceService,
    private paiementService: PaiementService,
    private annonceService: AnnonceService,
    private epreuveService: EpreuveService,
    private classeService: ClasseService,
    private salleService: SalleService,
    private eleveService: EleveService,
    private emploiTempsService: EmploiTempsService,
    private messageService: MessageService,
    private noteService: NoteService,
    private configService: ConfigAcademiqueService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_nom') ?? 'Membre';
    const permissionsStr = localStorage.getItem('permissions');
    this.permissions = permissionsStr ? JSON.parse(permissionsStr) : [];
    this.buildNavItems();
    this.loadEcole();
    this.loadConfig();
    this.loadData();
    setTimeout(() => {
      if (this.navItems.length > 0) {
        this.activeSection = this.navItems[0].id;
        this.cdr.detectChanges();
      }
    }, 0);
  }

  buildNavItems(): void {
    const items: NavItem[] = [];
    if (this.permissions.includes('gerer_absences'))
      items.push({ id: 'absences', label: 'Gestion Absences', icon: 'event_busy' });
    if (this.permissions.includes('gerer_scolarite'))
      items.push({ id: 'scolarite', label: 'Scolarité', icon: 'payments' });
    if (this.permissions.includes('saisir_notes'))
      items.push({ id: 'notes', label: 'Notes', icon: 'grade' });
    if (this.permissions.includes('gerer_emplois_temps'))
      items.push({ id: 'emploi-temps', label: 'Emploi du Temps', icon: 'schedule' });
    if (this.permissions.includes('publier_annonces'))
      items.push({ id: 'annonces', label: 'Annonces', icon: 'campaign' });
    if (this.permissions.includes('inscrire_eleves'))
      items.push({ id: 'inscription', label: 'Inscription Élèves', icon: 'person_add' });
    if (this.permissions.includes('gerer_classes'))
      items.push({ id: 'classes', label: 'Classes', icon: 'class' });
    if (this.permissions.includes('gerer_salles'))
      items.push({ id: 'salles', label: 'Salles', icon: 'meeting_room' });
    if (this.permissions.includes('bibliotheque'))
      items.push({ id: 'epreuves', label: 'Bibliothèque', icon: 'local_library' });
    if (this.permissions.includes('envoyer_messages'))
      items.push({ id: 'messages', label: 'Messages Parents', icon: 'mail' });
    this.navItems = items;
  }

  loadEcole(): void {
    this.ecoleService.getEcole().subscribe({
      next: (ecole: any) => { this.ecoleNom = ecole.nom; this.cdr.detectChanges(); },
    });
  }

  loadConfig(): void {
    this.configService.getLibelles().subscribe({
      next: (data: any) => {
        this.libelles = data.libelles ?? [];
        this.periodes = data.periodes ?? [];
        this.cdr.detectChanges();
      },
    });
  }

  loadData(): void {
    if (this.permissions.includes('gerer_absences')) this.loadAbsences();
    if (this.permissions.includes('inscrire_eleves') ||
        this.permissions.includes('gerer_scolarite') ||
        this.permissions.includes('saisir_notes') ||
        this.permissions.includes('envoyer_messages')) this.loadEleves();
    if (this.permissions.includes('gerer_classes') ||
        this.permissions.includes('gerer_scolarite')) this.loadClasses();
    if (this.permissions.includes('gerer_salles') ||
        this.permissions.includes('inscrire_eleves')) this.loadSalles();
    if (this.permissions.includes('publier_annonces')) this.loadAnnonces();
    if (this.permissions.includes('bibliotheque')) this.loadEpreuves();
    if (this.permissions.includes('gerer_emplois_temps')) this.loadEmploisTemps();
    if (this.permissions.includes('gerer_scolarite')) this.loadScolarite();
  }

  loadAbsences(): void {
    this.absenceService.getAbsencesEcole().subscribe({
      next: (data: any[]) => { this.absences = [...data]; this.cdr.detectChanges(); },
    });
  }

  loadEleves(): void {
    this.eleveService.listEleves().subscribe({
      next: (data: any[]) => { this.eleves = [...data]; this.cdr.detectChanges(); },
    });
  }

  loadClasses(): void {
    this.classeService.listClasses().subscribe({
      next: (data: any[]) => { this.classes = [...data]; this.cdr.detectChanges(); },
    });
  }

  loadSalles(): void {
    this.salleService.listSalles().subscribe({
      next: (data: any[]) => { this.salles = [...data]; this.cdr.detectChanges(); },
    });
  }

  loadAnnonces(): void {
    this.annonceService.listAnnonces().subscribe({
      next: (data: any[]) => { this.annonces = [...data]; this.cdr.detectChanges(); },
    });
  }

  loadEpreuves(): void {
    this.epreuveService.listEpreuves().subscribe({
      next: (data: any[]) => { this.epreuves = [...data]; this.cdr.detectChanges(); },
    });
  }

  loadEmploisTemps(): void {
    this.emploiTempsService.listEmploiTemps().subscribe({
      next: (data: any[]) => { this.emploisTemps = [...data]; this.cdr.detectChanges(); },
    });
  }

  loadScolarite(): void {
    this.paiementService.getSuiviScolariteEcole().subscribe({
      next: (data: any[]) => { this.scolarite = [...data]; this.cdr.detectChanges(); },
    });
  }

  loadNotesParSalle(): void {
    if (!this.salleSelectionneeNotes) return;
    this.isLoadingNotes = true;
    this.noteService.getNotesBySalleCompletes(this.salleSelectionneeNotes).subscribe({
      next: (data: any[]) => {
        this.notesParSalle = [...data];
        this.isLoadingNotes = false;
        this.cdr.detectChanges();
      },
      error: () => { this.isLoadingNotes = false; this.cdr.detectChanges(); },
    });
  }

  getMatieresList(): string[] {
    if (this.notesParSalle.length === 0) return [];
    const matieres = new Set<string>();
    this.notesParSalle.forEach((e) => Object.keys(e.matieres).forEach((m) => matieres.add(m)));
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

  // ABSENCES
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
        this.formSuccess = 'Absence enregistrée';
        this.absenceForm = { eleve_id: '', duree_heures: 1, motif: '', justifiee: false, date: new Date().toISOString().split('T')[0] };
        this.loadAbsences();
        this.cdr.detectChanges();
        setTimeout(() => (this.formSuccess = ''), 3000);
      },
      error: (err: any) => { this.isSubmitting = false; this.formError = err.error?.message || 'Erreur'; this.cdr.detectChanges(); },
    });
  }

  justifierAbsence(id: string): void {
    const motif = prompt('Motif :');
    if (!motif) return;
    this.absenceService.justifierAbsence(id, { motif }).subscribe({
      next: () => { this.formSuccess = 'Absence justifiée'; this.loadAbsences(); this.cdr.detectChanges(); setTimeout(() => (this.formSuccess = ''), 3000); },
    });
  }

  // SCOLARITE
  creerClasse(): void {
    if (!this.classeForm.nom) { this.formError = 'Veuillez renseigner le nom'; return; }
    this.formError = '';
    this.isSubmitting = true;
    this.classeService.createClasse(this.classeForm).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showAddClasse = false;
        this.formSuccess = 'Classe créée';
        this.classeForm = { nom: '', scolarite_totale: 0, tranches: [{ numero: 1, montant: 0, date_limite: '' }, { numero: 2, montant: 0, date_limite: '' }, { numero: 3, montant: 0, date_limite: '' }] };
        this.loadClasses();
        this.cdr.detectChanges();
        setTimeout(() => (this.formSuccess = ''), 3000);
      },
      error: (err: any) => { this.isSubmitting = false; this.formError = err.error?.message || 'Erreur'; this.cdr.detectChanges(); },
    });
  }

  definirTranches(): void {
    if (!this.trancheForm.classe_id) { this.formError = 'Veuillez sélectionner une classe'; return; }
    this.formError = '';
    this.isSubmittingTranche = true;
    this.classeService.updateClasse(this.trancheForm.classe_id, { tranches: this.trancheForm.tranches }).subscribe({
      next: () => {
        this.isSubmittingTranche = false;
        this.showAddTranche = false;
        this.formSuccess = 'Tranches définies';
        this.loadClasses();
        this.cdr.detectChanges();
        setTimeout(() => (this.formSuccess = ''), 3000);
      },
      error: (err: any) => { this.isSubmittingTranche = false; this.formError = err.error?.message || 'Erreur'; this.cdr.detectChanges(); },
    });
  }

  ouvrirEditClasse(classe: any): void {
    this.classeEditForm = {
      id: classe.id,
      nom: classe.nom,
      scolarite_totale: classe.scolarite_totale,
      tranches: classe.tranches?.length > 0 ? [...classe.tranches] : [{ numero: 1, montant: 0, date_limite: '' }, { numero: 2, montant: 0, date_limite: '' }, { numero: 3, montant: 0, date_limite: '' }],
    };
    this.showEditClasse = true;
  }

  modifierClasse(): void {
    if (!this.classeEditForm.nom) { this.formError = 'Veuillez renseigner le nom'; return; }
    this.formError = '';
    this.isSubmitting = true;
    this.classeService.updateClasse(this.classeEditForm.id, { nom: this.classeEditForm.nom, scolarite_totale: this.classeEditForm.scolarite_totale, tranches: this.classeEditForm.tranches }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showEditClasse = false;
        this.formSuccess = 'Classe modifiée';
        this.loadClasses();
        this.cdr.detectChanges();
        setTimeout(() => (this.formSuccess = ''), 3000);
      },
      error: (err: any) => { this.isSubmitting = false; this.formError = err.error?.message || 'Erreur'; this.cdr.detectChanges(); },
    });
  }

  enregistrerPaiement(eleveId: string, trancheId: string): void {
    const montant = prompt('Montant payé (FCFA) :');
    if (!montant) return;
    this.paiementService.enregistrerPaiement({ eleve_id: eleveId, tranche_id: trancheId, montant: Number(montant) }).subscribe({
      next: () => { this.formSuccess = 'Paiement enregistré'; this.loadScolarite(); this.cdr.detectChanges(); setTimeout(() => (this.formSuccess = ''), 3000); },
    });
  }

  // INSCRIPTION ELEVE
  inscrireEleve(): void {
    if (!this.eleveForm.nom || !this.eleveForm.prenom || !this.eleveForm.date_naissance || !this.eleveForm.lieu_naissance || !this.eleveForm.nom_parent || !this.eleveForm.contact_parent || !this.eleveForm.salle_id) {
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
      error: (err: any) => { this.isSubmitting = false; this.formError = err.error?.message || 'Erreur'; this.cdr.detectChanges(); },
    });
  }

  resetEleveForm(): void {
    this.eleveForm = { nom: '', prenom: '', sexe: 'masculin', npi: '', date_naissance: '', lieu_naissance: '', quartier: '', nom_parent: '', contact_parent: '', email_parent: '', profession_parent: '', salle_id: '' };
    this.selectedClasseId = '';
    this.formError = '';
  }

  // EMPLOI DU TEMPS
  onEmploiFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) this.selectedEmploiFile = file;
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
      this.emploiTempsService.ajouterEmploiTemps({ salle_id: this.emploiForm.salle_id, fichier_pdf_url: base64, annee_academique: this.emploiForm.annee_academique || '' }).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.showAddEmploi = false;
          this.formSuccess = 'Emploi du temps ajouté';
          this.emploiForm = { salle_id: '', annee_academique: '', fichier_pdf_url: '' };
          this.selectedEmploiFile = null;
          this.loadEmploisTemps();
          this.cdr.detectChanges();
          setTimeout(() => (this.formSuccess = ''), 3000);
        },
        error: (err: any) => { this.isSubmitting = false; this.formError = err.error?.message || 'Erreur'; this.cdr.detectChanges(); },
      });
    };
    reader.readAsDataURL(this.selectedEmploiFile);
  }

  // ANNONCES
  addAnnonce(): void {
    if (!this.annonceForm.titre || !this.annonceForm.contenu) { this.formError = 'Veuillez remplir tous les champs'; return; }
    this.isSubmitting = true;
    this.formError = '';
    this.annonceService.publierAnnonce(this.annonceForm).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.formSuccess = 'Annonce publiée';
        this.showAddAnnonce = false;
        this.annonceForm = { titre: '', contenu: '', cible: 'tous' };
        this.loadAnnonces();
        this.cdr.detectChanges();
        setTimeout(() => (this.formSuccess = ''), 3000);
      },
      error: (err: any) => { this.isSubmitting = false; this.formError = err.error?.message || 'Erreur'; this.cdr.detectChanges(); },
    });
  }

  // MESSAGES
  contacterParent(eleveId: string): void {
    const sujet = prompt('Sujet :') ?? 'Message';
    const message = prompt('Message :');
    if (!message) return;
    this.messageService.envoyerMessage(eleveId, { contenu: message, sujet }).subscribe({
      next: () => { this.formSuccess = 'Message envoyé'; this.cdr.detectChanges(); setTimeout(() => (this.formSuccess = ''), 3000); },
    });
  }

  logout(): void {
    this.authService.logout();
  }
}