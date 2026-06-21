import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { EcoleService } from '../../../services/ecole';
import { AnnonceService } from '../../../services/annonce';
import { EpreuveService } from '../../../services/epreuve';
import { NavItem } from '../../../shared/components/sidebar/sidebar';
import { RolePersonnaliseService } from '../../../services/role-personnalise';
import { MatiereService } from '../../../services/matiere';

type CibleAnnonce = 'tous' | 'membres' | 'parents';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss'],
})
export class Admin implements OnInit {
  sidebarOpen = true;
  activeSection = 'vue-generale';
  ecoleNom = '';
  userName = '';
  userEmail = '';
  userTelephone = '';
  isLoading = false;
  isSubmitting = false;
  isEditingProfil = false;

  stats = {
    membres: 0,
    professeurs: 0,
    secretaires: 0,
    superviseurs: 0,
    eleves: 0,    
    classes: 0,   
    salles: 0, 
    absences: 0,
  };

  membres: any[] = [];
  annonces: any[] = [];
  epreuves: any[] = [];
  matieres: any[] = [];
  selectedMatieres: string[] = [];


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

  profilForm = {
    nom: '',
    prenom: '',
    telephone: '',
  };

  searchEpreuve = '';
  formError = '';
  formSuccess = '';

  roles: any[] = [];
actionsDisponibles: { id: string; label: string }[] = [];
showAddRole = false;
currentStep = 1;
isSubmittingRole = false;

membreRoleForm = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
};

roleForm = {
  titre: '',
  actions: [] as string[],
};

membrePersonnaliseForm = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  role_personnalise_id: '',
};

showAddMembrePersonnalise = false;
isSubmittingMembrePersonnalise = false;

  navItems: NavItem[] = [
    { id: 'vue-generale', label: 'Vue Générale', icon: 'dashboard' },
    { id: 'personnel', label: 'Gestion Personnel', icon: 'groups' },
    { id: 'epreuves', label: 'Bibliothèque', icon: 'local_library' },
    { id: 'annonces', label: 'Annonces', icon: 'campaign' },
    { id: 'profil', label: 'Profil', icon: 'manage_accounts' },
    { id: 'roles', label: 'Rôles & Membres', icon: 'admin_panel_settings' },
  ];

  constructor(
    private authService: AuthService,
    private ecoleService: EcoleService,
    private annonceService: AnnonceService,
    private epreuveService: EpreuveService,
    private rolePersonnaliseService: RolePersonnaliseService,
    private cdr: ChangeDetectorRef,
    private matiereService: MatiereService,
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_nom') ?? 'Admin';
    this.userEmail = localStorage.getItem('user_email') ?? '';
    this.profilForm.nom = this.userName.split(' ')[1] ?? '';
    this.profilForm.prenom = this.userName.split(' ')[0] ?? '';
    this.loadEcole();
    this.loadStats();
    this.loadMembres();
    this.loadAnnonces();
    this.loadEpreuves();
    this.loadRoles();
    this.loadActions();
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


  loadRoles(): void {
  this.rolePersonnaliseService.listRoles().subscribe({
    next: (roles: any[]) => {
      this.roles = [...roles];
      this.cdr.detectChanges();
    },
  });
}

loadActions(): void {
  this.rolePersonnaliseService.getActions().subscribe({
    next: (actions) => {
      this.actionsDisponibles = actions;
      this.cdr.detectChanges();
    },
  });
}

toggleMatiere(id: string): void {
  const index = this.selectedMatieres.indexOf(id);
  if (index === -1) {
    this.selectedMatieres.push(id);
  } else {
    this.selectedMatieres.splice(index, 1);
  }
}

isMatiereSelected(id: string): boolean {
  return this.selectedMatieres.includes(id);
}

nextStepRole(): void {
  if (!this.membreRoleForm.nom || !this.membreRoleForm.prenom ||
      !this.membreRoleForm.email) {
    this.formError = 'Veuillez remplir tous les champs obligatoires';
    return;
  }
  this.formError = '';
  this.currentStep = 2;
}

prevStepRole(): void {
  this.currentStep = 1;
  this.formError = '';
}

toggleAction(actionId: string): void {
  const index = this.roleForm.actions.indexOf(actionId);
  if (index === -1) {
    this.roleForm.actions.push(actionId);
  } else {
    this.roleForm.actions.splice(index, 1);
  }
}

isActionSelected(actionId: string): boolean {
  return this.roleForm.actions.includes(actionId);
}

creerMembrePersonnalise(): void {
  if (!this.roleForm.titre) {
    this.formError = 'Veuillez renseigner le titre du rôle';
    return;
  }
  if (this.roleForm.actions.length === 0) {
    this.formError = 'Veuillez sélectionner au moins une action';
    return;
  }

  this.formError = '';
  this.isSubmittingRole = true;

  // Étape 1 : créer le rôle
  this.rolePersonnaliseService.creerRole({
    titre: this.roleForm.titre,
    actions: this.roleForm.actions,
  }).subscribe({
    next: (role: any) => {
      // Étape 2 : créer le membre avec ce rôle
      const payload = {
        ...this.membreRoleForm,
        role: 'autre',
        role_personnalise_id: role.id,
      };

      this.ecoleService.creerMembre(payload).subscribe({
        next: (res: any) => {
          this.isSubmittingRole = false;
          this.showAddRole = false;
          this.currentStep = 1;
          this.formSuccess = `Membre créé ! Identifiant : ${res.identifiant}`;
          this.resetRoleForm();
          this.loadRoles();
          this.loadMembres();
          setTimeout(() => (this.formSuccess = ''), 5000);
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.isSubmittingRole = false;
          this.formError = err.error?.message || 'Une erreur est survenue';
          this.cdr.detectChanges();
        },
      });
    },
    error: (err: any) => {
      this.isSubmittingRole = false;
      this.formError = err.error?.message || 'Une erreur est survenue';
      this.cdr.detectChanges();
    },
  });
}

supprimerRole(id: string): void {
  if (!confirm('Voulez-vous vraiment supprimer ce rôle ?')) return;
  this.rolePersonnaliseService.supprimerRole(id).subscribe({
    next: () => {
      this.roles = this.roles.filter((r) => r.id !== id);
      this.cdr.detectChanges();
    },
  });
}

resetRoleForm(): void {
  this.membreRoleForm = { nom: '', prenom: '', email: '', telephone: '' };
  this.roleForm = { titre: '', actions: [] };
  this.currentStep = 1;
  this.formError = '';
}

  loadStats(): void {
    this.ecoleService.getStatistiques().subscribe({
      next: (stats: any) => {
        this.stats = { ...stats };
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

  searchEpreuves(): void {
    this.loadEpreuves();
  }

 getActionLabel(actionId: string): string {
  const action = this.actionsDisponibles.find((a) => a.id === actionId);
  return action?.label ?? actionId;
}

  addMembre(): void {
  if (!this.membreForm.nom || !this.membreForm.prenom ||
      !this.membreForm.email || !this.membreForm.role) {
    this.formError = 'Veuillez remplir tous les champs obligatoires';
    return;
  }

  if (this.membreForm.role === 'professeur' && this.selectedMatieres.length === 0) {
    this.formError = 'Veuillez sélectionner au moins une matière';
    return;
  }

  this.formError = '';
  this.isSubmitting = true;

  const payload = {
    ...this.membreForm,
    matieres: this.membreForm.role === 'professeur' ? this.selectedMatieres : [],
  };

  this.ecoleService.creerMembre(payload).subscribe({
    next: (res: any) => {
      this.isSubmitting = false;
      this.showAddMembre = false;
      this.formSuccess = `Membre créé ! Identifiant : ${res.identifiant}`;
      this.selectedMatieres = [];
      this.resetMembreForm();
      this.loadMembres();
      this.loadStats();
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
  supprimerMembre(id: string): void {
    if (!confirm('Voulez-vous vraiment supprimer ce membre ?')) return;
    this.ecoleService.supprimerMembre(id).subscribe({
      next: () => {
        this.membres = this.membres.filter((m) => m.id !== id);
        this.loadStats();
        this.cdr.detectChanges();
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
        this.cdr.detectChanges();
        setTimeout(() => (this.formSuccess = ''), 3000);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.formError = err.error?.message || 'Une erreur est survenue';
        this.cdr.detectChanges();
      },
    });
  }

  supprimerAnnonce(id: string): void {
    if (!confirm('Voulez-vous vraiment supprimer cette annonce ?')) return;
    this.annonceService.deleteAnnonce(id).subscribe({
      next: () => {
        this.annonces = this.annonces.filter((a) => a.id !== id);
        this.cdr.detectChanges();
      },
    });
  }

  saveProfil(): void {
    this.isLoading = true;
    this.ecoleService.updateEcole(this.profilForm).subscribe({
      next: () => {
        this.isLoading = false;
        this.isEditingProfil = false;
        this.formSuccess = 'Profil mis à jour !';
        this.cdr.detectChanges();
        setTimeout(() => (this.formSuccess = ''), 3000);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.formError = err.error?.message || 'Une erreur est survenue';
        this.cdr.detectChanges();
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