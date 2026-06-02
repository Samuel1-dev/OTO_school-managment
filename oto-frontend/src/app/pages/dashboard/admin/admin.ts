import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { EcoleService } from '../../../services/ecole';
import { AnnonceService } from '../../../services/annonce';
import { NavItem } from '../../../shared/components/sidebar/sidebar';

type CibleAnnonce = 'tous' | 'membres' | 'parents';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss'],
})
export class Admin implements OnInit {
  sidebarOpen = true;
  activeSection = '';
  ecoleNom = '';
  userName = '';
  isLoading = false;

  stats = {
    membres: 0,
    professeurs: 0,
    secretaires: 0,
    superviseurs: 0,
  };

  membres: any[] = [];
  annonces: any[] = [];

  showAddMembre = false;
  showAddAnnonce = false;

 membreForm: {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  type_superviseur: string;
  matieres: string;
} = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  role: 'professeur',
  type_superviseur: '',
  matieres: '',
};

  annonceForm: { titre: string; contenu: string; cible: CibleAnnonce } = {
    titre: '',
    contenu: '',
    cible: 'tous',
  };

  formError = '';
  formSuccess = '';

  isSubmitting = false; // nouvelle variable

  navItems: NavItem[] = [
    { id: 'vue-generale', label: 'Vue Générale', icon: 'dashboard' },
    { id: 'personnel', label: 'Gestion Personnel', icon: 'groups' },  
    { id: 'epreuves', label: 'Bibliothèque', icon: 'local_library' },
    { id: 'annonces', label: 'Annonces', icon: 'campaign' },
    { id: 'profil', label: 'Profil', icon: 'manage_accounts' },
  ];

  constructor(
    private authService: AuthService,
    private ecoleService: EcoleService,
    private annonceService: AnnonceService,
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_nom') ?? 'Admin';
    this.loadEcole();
    this.loadStats();
    this.loadMembres();
    this.loadAnnonces();
    setTimeout(() => {
      this.activeSection = 'vue-generale';
    }, 0);
  }

  loadEcole(): void {
    this.ecoleService.getEcole().subscribe({
      next: (ecole: any) => {
        this.ecoleNom = ecole.nom;
      },
    });
  }

  loadStats(): void {
    this.ecoleService.getStatistiques().subscribe({
      next: (stats: any) => {
        this.stats = stats;
      },
    });
  }

  loadMembres(): void {
    this.ecoleService.getMembres().subscribe({
      next: (membres: any[]) => {
        this.membres = membres;
      },
    });
  }

  loadAnnonces(): void {
    this.annonceService.listAnnonces().subscribe({
      next: (annonces: any[]) => {
        this.annonces = annonces;
      },
    });
  }

 addMembre(): void {
  if (
    !this.membreForm.nom ||
    !this.membreForm.prenom ||
    !this.membreForm.email ||
    !this.membreForm.role
  ) {
    this.formError = 'Veuillez remplir tous les champs obligatoires';
    return;
  }

  if (this.membreForm.role === 'professeur' && !this.membreForm.matieres) {
    this.formError = 'Veuillez renseigner les matières enseignées';
    return;
  }

  this.formError = '';
  this.isSubmitting = true;

  const payload = {
    ...this.membreForm,
    matieres: this.membreForm.matieres
      ? this.membreForm.matieres.split(',').map((m) => m.trim())
      : [],
  };

  this.ecoleService.creerMembre(payload).subscribe({
    next: (res: any) => {
      this.isSubmitting = false;
      this.showAddMembre = false;
      this.formSuccess = `Membre créé ! Identifiant : ${res.identifiant}`;
      this.resetMembreForm();
      this.loadMembres();
      this.loadStats();
      setTimeout(() => (this.formSuccess = ''), 5000);
    },
    error: (err: any) => {
      this.isSubmitting = false;
      this.formError = err.error?.message || 'Une erreur est survenue';
    },
  });
}
  supprimerMembre(id: string): void {
    if (!confirm('Voulez-vous vraiment supprimer ce membre ?')) return;
    this.ecoleService.supprimerMembre(id).subscribe({
      next: () => {
        this.loadMembres();
        this.loadStats();
      },
    });
  }

  resetMembreForm(): void {
  this.membreForm = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    role: 'professeur',
    type_superviseur: '',
    matieres: '',
  };
  this.formError = '';
}

  addAnnonce(): void {
    if (!this.annonceForm.titre || !this.annonceForm.contenu) {
      this.formError = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;
    this.formError = '';

    this.annonceService.publierAnnonce(this.annonceForm).subscribe({
      next: () => {
        this.isLoading = false;
        this.formSuccess = 'Annonce publiée !';
        this.showAddAnnonce = false;
        this.annonceForm = { titre: '', contenu: '', cible: 'tous' };
        this.loadAnnonces();
        setTimeout(() => (this.formSuccess = ''), 3000);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.formError = err.error?.message || 'Une erreur est survenue';
      },
    });
  }

  getRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      admin: 'Admin',
      professeur: 'Professeur',
      secretaire: 'Secrétaire',
      superviseur: 'Superviseur',
      autre: 'Autre',
    };
    return labels[role] ?? role;
  }

  getRoleColor(role: string): string {
    const colors: Record<string, string> = {
      admin: 'sky',
      professeur: 'green',
      secretaire: 'orange',
      superviseur: 'purple',
      autre: 'indigo',
    };
    return colors[role] ?? 'sky';
  }

  logout(): void {
    this.authService.logout();
  }
}