import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContactService, ContactMessageResponse } from '../../service/contact.service';
import { interval, startWith, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bo-messages',
  standalone: false,
  templateUrl: './messages.html',
  styleUrls: ['./messages.scss'],
})
export class Messages implements OnInit {
  messages: ContactMessageResponse[] = [];
  loading = false;
  filtreActif: 'tous' | 'non_traites' | 'traites' = 'tous';

  showDetailModal = false;
  messageDetail: ContactMessageResponse | null = null;

  showReponseModal = false;
  messageSelectionne: ContactMessageResponse | null = null;
  texteReponse = '';
  actionLoading = false;

  toast: { message: string; type: 'success' | 'error' } | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    interval(10000)
      .pipe(
        startWith(0),
        takeUntil(this.destroy$),
        switchMap(() => {
          if (this.messages.length === 0) {
            this.loading = true;
          }
          return this.contactService.listMessages();
        }),
      )
      .subscribe({
        next: (data) => {
          // Ne pas écraser/fermer une modal ouverte par l'admin pendant le polling
          if (JSON.stringify(this.messages) !== JSON.stringify(data)) {
            this.messages = data;
          }
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
  }

  chargerMessages(): void {
    this.loading = true;
    this.contactService.listMessages().subscribe({
      next: (data) => {
        this.messages = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  get countTous(): number {
    return this.messages.length;
  }
  get countNonTraites(): number {
    return this.messages.filter((m) => !m.traite).length;
  }
  get countTraites(): number {
    return this.messages.filter((m) => m.traite).length;
  }

  getMessagesAffiches(): ContactMessageResponse[] {
    switch (this.filtreActif) {
      case 'non_traites':
        return this.messages.filter((m) => !m.traite);
      case 'traites':
        return this.messages.filter((m) => m.traite);
      default:
        return this.messages;
    }
  }

  ouvrirDetail(msg: ContactMessageResponse): void {
    this.messageDetail = msg;
    this.showDetailModal = true;
  }

  fermerDetail(): void {
    this.showDetailModal = false;
    this.messageDetail = null;
  }

  ouvrirReponse(msg: ContactMessageResponse): void {
    this.messageSelectionne = msg;
    this.texteReponse = msg.reponse || '';
    this.showReponseModal = true;
  }

  fermerReponse(): void {
    this.showReponseModal = false;
    this.messageSelectionne = null;
    this.texteReponse = '';
  }

  envoyerReponse(): void {
    if (!this.messageSelectionne || !this.texteReponse.trim()) return;

    this.actionLoading = true;
    this.contactService.repondre(this.messageSelectionne.id, this.texteReponse).subscribe({
      next: () => {
        this.actionLoading = false;
        this.afficherToast('Réponse envoyée avec succès', 'success');
        this.fermerReponse();
        this.fermerDetail();
        this.chargerMessages();
      },
      error: (err) => {
        this.actionLoading = false;
        this.afficherToast(`Erreur : ${err?.error?.message || 'Erreur inconnue'}`, 'error');
      },
    });
  }

showDeleteConfirm = false;
messageASupprimer: ContactMessageResponse | null = null;

ouvrirSuppression(msg: ContactMessageResponse): void {
  this.messageASupprimer = msg;
  this.showDeleteConfirm = true;
}

annulerSuppression(): void {
  this.showDeleteConfirm = false;
  this.messageASupprimer = null;
}

confirmerSuppression(): void {
  if (!this.messageASupprimer) return;

  this.contactService.supprimerMessage(this.messageASupprimer.id).subscribe({
    next: () => {
      this.afficherToast('Message supprimé', 'success');
      this.fermerDetail();
      this.annulerSuppression();
      this.chargerMessages();
    },
    error: (err) => {
      this.afficherToast(`Erreur : ${err?.error?.message || 'Erreur inconnue'}`, 'error');
      this.annulerSuppression();
    },
  });
}

  private afficherToast(message: string, type: 'success' | 'error'): void {
    this.toast = { message, type };
    setTimeout(() => (this.toast = null), 3000);
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    try {
      return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  }
   ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}