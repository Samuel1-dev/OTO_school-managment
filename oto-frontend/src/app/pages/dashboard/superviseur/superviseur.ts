import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { EcoleService } from '../../../services/ecole';
import { AbsenceService } from '../../../services/absence';
import { AnnonceService } from '../../../services/annonce';
import { EpreuveService } from '../../../services/epreuve';
import { NavItem } from '../../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-superviseur',
  standalone: false,
  templateUrl: './superviseur.html',
  styleUrls: ['./superviseur.scss'],
})
export class Superviseur implements OnInit {
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

  absences: any[] = [];
  annonces: any[] = [];
  epreuves: any[] = [];

  showAddAbsence = false;
  formError = '';
  formSuccess = '';
  searchEpreuve = '';

  absenceForm = {
    eleve_id: '',
    duree_heures: 1,
    motif: '',
    justifiee: false,
    date: new Date().toISOString().split('T')[0],
  };

  navItems: NavItem[] = [
    { id: 'vue-generale', label: 'Vue Générale', icon: 'dashboard' },
    { id: 'absences', label: 'Gestion Absences', icon: 'event_busy' },
    { id: 'classes', label: 'Classes & Salles', icon: 'class' },
    { id: 'emploi-temps', label: 'Emploi du Temps', icon: 'schedule' },
    { id: 'epreuves', label: 'Bibliothèque', icon: 'local_library' },
    { id: 'annonces', label: 'Annonces & Com', icon: 'campaign' },
  ];

  constructor(
    private authService: AuthService,
    private ecoleService: EcoleService,
    private absenceService: AbsenceService,
    private annonceService: AnnonceService,
    private epreuveService: EpreuveService,
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_nom') ?? 'Superviseur';
    this.loadEcole();
    this.loadStats();
    this.loadAbsences();
    this.loadAnnonces();
    this.loadEpreuves();
    setTimeout(() => {
      this.activeSection = 'vue-generale';
    }, 0);
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

  loadAbsences(): void {
    this.absenceService.getAbsencesEcole().subscribe({
      next: (absences: any[]) => { this.absences = absences; },
    });
  }

  loadAnnonces(): void {
    this.annonceService.listAnnonces().subscribe({
      next: (annonces: any[]) => { this.annonces = annonces; },
    });
  }

  loadEpreuves(): void {
    this.epreuveService.listEpreuves(this.searchEpreuve).subscribe({
      next: (epreuves: any[]) => { this.epreuves = epreuves; },
    });
  }

  justifierAbsence(id: string): void {
    const motif = prompt('Motif de justification :');
    if (!motif) return;
    this.absenceService.justifierAbsence(id, { motif }).subscribe({
      next: () => {
        this.formSuccess = 'Absence justifiée';
        this.loadAbsences();
        setTimeout(() => (this.formSuccess = ''), 3000);
      },
    });
  }

  contacterParent(eleveId: string): void {
    const message = prompt('Message à envoyer au parent :');
    if (!message) return;
    this.absenceService.contacterParent(eleveId, message).subscribe({
      next: () => {
        this.formSuccess = 'Email envoyé au parent';
        setTimeout(() => (this.formSuccess = ''), 3000);
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