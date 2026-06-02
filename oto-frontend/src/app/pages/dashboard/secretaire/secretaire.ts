import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { EcoleService } from '../../../services/ecole';
import { EleveService } from '../../../services/eleve';
import { PaiementService } from '../../../services/paiement';
import { AnnonceService } from '../../../services/annonce';
import { EpreuveService } from '../../../services/epreuve';
import { ClasseService } from '../../../services/classe';
import { NavItem } from '../../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-secretaire',
  standalone: false,
  templateUrl: './secretaire.html',
  styleUrls: ['./secretaire.scss'],
})
export class Secretaire implements OnInit {
  sidebarOpen = true;
  activeSection = '';
  ecoleNom = '';
  userName = '';
  isSubmitting = false;

  stats = {
    membres: 0,
    professeurs: 0,
    secretaires: 0,
    superviseurs: 0,
  };

  eleves: any[] = [];
  classes: any[] = [];
  scolarite: any[] = [];
  annonces: any[] = [];
  epreuves: any[] = [];

  showAddEleve = false;
  formError = '';
  formSuccess = '';

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

  navItems: NavItem[] = [
    { id: 'vue-generale', label: 'Vue Générale', icon: 'dashboard' },
    { id: 'inscription', label: 'Inscription Élève', icon: 'person_add' },
    { id: 'scolarite', label: 'Scolarité', icon: 'payments' },
    { id: 'epreuves', label: 'Bibliothèque', icon: 'local_library' },
    { id: 'annonces', label: 'Annonces & Com', icon: 'campaign' },
  ];

  constructor(
    private authService: AuthService,
    private ecoleService: EcoleService,
    private eleveService: EleveService,
    private paiementService: PaiementService,
    private annonceService: AnnonceService,
    private epreuveService: EpreuveService,
    private classeService: ClasseService,
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_nom') ?? 'Secrétaire';
    this.loadEcole();
    this.loadStats();
    this.loadEleves();
    this.loadClasses();
    this.loadScolarite();
    this.loadAnnonces();
    this.loadEpreuves();
    setTimeout(() => { this.activeSection = 'vue-generale'; }, 0);
  }

  loadEcole(): void {
    this.ecoleService.getEcole().subscribe({
      next: (ecole: any) => { this.ecoleNom = ecole.nom; },
    });
  }

  loadStats(): void {
    this.ecoleService.getStatistiques().subscribe({
      next: (stats: any) => { this.stats = stats; },
    });
  }

  loadEleves(): void {
    this.eleveService.listEleves().subscribe({
      next: (eleves: any[]) => { this.eleves = eleves; },
    });
  }

  loadClasses(): void {
    this.classeService.listClasses().subscribe({
      next: (classes: any[]) => { this.classes = classes; },
    });
  }

  loadScolarite(): void {
    this.paiementService.getSuiviScolariteEcole().subscribe({
      next: (data: any[]) => { this.scolarite = data; },
    });
  }

  loadAnnonces(): void {
    this.annonceService.listAnnonces().subscribe({
      next: (annonces: any[]) => { this.annonces = annonces; },
    });
  }

  loadEpreuves(): void {
    this.epreuveService.listEpreuves().subscribe({
      next: (epreuves: any[]) => { this.epreuves = epreuves; },
    });
  }

  getSallesByClasse(classeId: string): any[] {
    const classe = this.classes.find((c: any) => c.id === classeId);
    return classe?.salles ?? [];
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
        setTimeout(() => (this.formSuccess = ''), 5000);
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.formError = err.error?.message || 'Une erreur est survenue';
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
    this.formError = '';
  }

  contacterParent(eleveId: string): void {
    const message = prompt('Message à envoyer au parent :');
    if (!message) return;
    this.paiementService.contacterParentScolarite(eleveId, message).subscribe({
      next: () => {
        this.formSuccess = 'Email envoyé au parent';
        setTimeout(() => (this.formSuccess = ''), 3000);
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }
}