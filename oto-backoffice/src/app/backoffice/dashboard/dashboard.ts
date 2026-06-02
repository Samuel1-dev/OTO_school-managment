import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject, forkJoin, takeUntil } from 'rxjs';
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

  constructor(
    private ecoleService: EcoleService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef // Injecté pour forcer le rafraîchissement asynchrone
  ) {}

  ngOnInit(): void {
    this.chargerToutesLesDonnees();
  }

  /**
   * Charge simultanément toutes les écoles et les demandes en attente
   * pour éviter les décalages d'affichage et le chargement infini.
   */
  chargerToutesLesDonnees(): void {
    this.loadingEcoles = true;
    this.erreurEcoles = '';

    // forkJoin attend la réponse complète des deux endpoints de l'API
    forkJoin({
      toutes: this.ecoleService.getAllEcoles(),
      enAttente: this.ecoleService.getEcolesPending()
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resultats) => {
        // Enregistrement des listes en mémoire
        this.ecoles = resultats.toutes.ecoles || resultats.toutes;
        this.ecolesPending = resultats.enAttente.ecoles || resultats.enAttente;

        // Tri automatique des écoles validées et rejetées
        this.categoriserEcoles();

        // On s'assure que le filtre est bien positionné globalement et on coupe le spinner
        this.filtreActif = 'toutes';
        this.loadingEcoles = false;

        // On force Angular à inspecter le changement de données immédiat
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loadingEcoles = false;
        console.error('Erreur lors du chargement des données de l\'API:', err);
        this.erreurEcoles = 'Impossible de charger les données du tableau de bord.';
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Sépare les écoles de la liste générale selon leur statut
   */
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

  /**
   * Retourne la bonne liste d'écoles à itérer dans le tableau HTML
   */
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

  /**
   * Action : Valider un établissement
   */
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
          this.chargerToutesLesDonnees(); // Recharge la grille proprement
        },
        error: (err) => {
          this.actionLoading = false;
          this.afficherToast(`Erreur : ${err?.error?.message || 'Erreur inconnue'}`, 'error');
        }
      });
  }

  // ─── Gestion de la Modal Détails ──────────────────────────────────────────
  ouvrirDetail(ecole: EcoleResponse): void {
    this.ecoleDetail = ecole;
    this.showDetailModal = true;
  }

  fermerDetail(): void {
    this.showDetailModal = false;
    this.ecoleDetail = null;
  }

  // ─── Gestion de la Modal de Rejet ─────────────────────────────────────────
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

  // ─── Utilitaires complémentaires ──────────────────────────────────────────
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