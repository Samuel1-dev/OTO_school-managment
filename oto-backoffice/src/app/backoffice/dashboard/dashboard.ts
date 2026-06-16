import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject, forkJoin, takeUntil, interval, startWith, switchMap, Subscription } from 'rxjs';
import { EcoleService, EcoleResponse } from '../../service/ecole.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit, OnDestroy {
  // Tableaux de données
  ecoles: EcoleResponse[] = [];
  ecolesPending: EcoleResponse[] = [];
  ecoleValidees: EcoleResponse[] = [];
  ecoleRejetees: EcoleResponse[] = [];

  // États de l'interface
  loadingEcoles = false;
  erreurEcoles = '';
  
  // Par défaut, le filtre actif se positionne sur la vue globale
  filtreActif: 'toutes' | 'en_attente' | 'validee' | 'rejetee' = 'toutes';

  // Gestion des Modals et Actions
  ecoleDetail: EcoleResponse | null = null;
  showDetailModal = false;
  ecoleSelectionnee: EcoleResponse | null = null;
  showRejetModal = false;
  motifRejet = '';

  actionLoading = false;
  toast: { message: string; type: 'success' | 'error' } | null = null;

  private destroy$ = new Subject<void>();
  private pollingSubscription!: Subscription; 

  constructor(
    private ecoleService: EcoleService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.pollingSubscription = interval(15000)
      .pipe(
        startWith(0),
        takeUntil(this.destroy$),
        switchMap(() => {
          // On n'active le spinner de chargement initial que si la liste est vide
          if (this.ecoles.length === 0) {
            this.loadingEcoles = true;
          }
          return forkJoin({
            toutes: this.ecoleService.getAllEcoles(),
            enAttente: this.ecoleService.getEcolesPending()
          });
        })
      )
      .subscribe({
        next: (resultats) => {
          const nouvellesEcoles = resultats.toutes.ecoles || resultats.toutes;
          const nouvellesEcolesPending = resultats.enAttente.ecoles || resultats.enAttente;

          if (
            JSON.stringify(this.ecoles) !== JSON.stringify(nouvellesEcoles) ||
            JSON.stringify(this.ecolesPending) !== JSON.stringify(nouvellesEcolesPending)
          ) {
            this.ecoles = nouvellesEcoles;
            this.ecolesPending = nouvellesEcolesPending;

            // Tri automatique des écoles validées et rejetées
            this.categoriserEcoles();
          }

          this.loadingEcoles = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.loadingEcoles = false;
          console.error('Erreur lors du rafraîchissement automatique de l\'API:', err);
          this.erreurEcoles = 'Impossible de charger ou de synchroniser les données du tableau de bord.';
          this.cdr.detectChanges();
        }
      });
  }

  
  chargerToutesLesDonnees(): void {
    this.loadingEcoles = true;
    this.erreurEcoles = '';

    forkJoin({
      toutes: this.ecoleService.getAllEcoles(),
      enAttente: this.ecoleService.getEcolesPending()
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resultats) => {
        this.ecoles = resultats.toutes.ecoles || resultats.toutes;
        this.ecolesPending = resultats.enAttente.ecoles || resultats.enAttente;

        this.categoriserEcoles();

        this.filtreActif = 'toutes';
        this.loadingEcoles = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loadingEcoles = false;
        console.error('Erreur lors du chargement manuel des données:', err);
        this.erreurEcoles = 'Impossible de rafraîchir les données.';
        this.cdr.detectChanges();
      }
    });
  }


  private categoriserEcoles(): void {
    this.ecoleValidees = this.ecoles.filter(e => {
      const s = (e.status || (e as any).statut || '').toUpperCase();
      return s === 'VALIDEE' || s === 'ACTIVE';
    });

    this.ecoleRejetees = this.ecoles.filter(e => {
      const s = (e.status || (e as any).statut || '').toUpperCase();
      return s === 'REJETEE' || s === 'REJECTED';
    });
  }

  
  getEcolesAffichees(): EcoleResponse[] {
    if (!this.ecoles || this.ecoles.length === 0) {
      if (this.filtreActif === 'en_attente') return this.ecolesPending || [];
      return [];
    }

    switch (this.filtreActif) {
      case 'en_attente':
        return this.ecolesPending || [];
      case 'validee':
        return this.ecoleValidees || [];
      case 'rejetee':
        return this.ecoleRejetees || [];
      case 'toutes':
      default:
        return this.ecoles || [];
    }
  }

  // Getters rapides pour les compteurs statistiques (Cards)
  get countEnAttente(): number { return this.ecolesPending.length; }
  get countValidees(): number { return this.ecoleValidees.length; }
  get countRejetees(): number { return this.ecoleRejetees.length; }

  
  valider(ecole: EcoleResponse): void {
    if (!ecole) return;
    if (!confirm(`Êtes-vous sûr de vouloir valider "${ecole.nom}" ?`)) return;

    this.actionLoading = true;
    this.ecoleService.validateEcole(ecole.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.actionLoading = false;
          this.afficherToast(`École "${ecole.nom}" validée avec succès.`, 'success');
          this.fermerDetail();
          this.chargerToutesLesDonnees(); // Recharge la grille proprement après action
        },
        error: (err) => {
          this.actionLoading = false;
          this.afficherToast(`Erreur : ${err?.error?.message || 'Erreur inconnue'}`, 'error');
        }
      });
  }

  ouvrirDetail(ecole: EcoleResponse): void {
    this.ecoleDetail = ecole;
    this.showDetailModal = true;
  }

  fermerDetail(): void {
    this.showDetailModal = false;
    this.ecoleDetail = null;
  }

  ouvrirRejet(ecole: EcoleResponse): void {
    this.ecoleSelectionnee = ecole;
    this.showRejetModal = true;
    this.motifRejet = '';
  }

  fermerRejet(): void {
    this.showRejetModal = false;
    this.ecoleSelectionnee = null;
    this.motifRejet = '';
  }

  confirmerRejet(): void {
    if (!this.ecoleSelectionnee || !this.motifRejet.trim()) return;

    this.actionLoading = true;
    this.ecoleService.rejectEcole(this.ecoleSelectionnee.id, this.motifRejet)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.actionLoading = false;
          this.afficherToast(`École "${this.ecoleSelectionnee!.nom}" rejetée.`, 'success');
          this.fermerRejet();
          this.chargerToutesLesDonnees();
        },
        error: (err) => {
          this.actionLoading = false;
          this.afficherToast(`Erreur : ${err?.error?.message || 'Erreur inconnue'}`, 'error');
        }
      });
  }

  private afficherToast(message: string, type: 'success' | 'error'): void {
    this.toast = { message, type };
    setTimeout(() => { this.toast = null; }, 3000);
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  }

  deconnexion(): void {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      this.authService.logout();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}