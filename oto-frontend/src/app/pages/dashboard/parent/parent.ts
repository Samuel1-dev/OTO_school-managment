import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { EleveService } from '../../../services/eleve';
import { NoteService } from '../../../services/note';
import { AbsenceService } from '../../../services/absence';
import { PaiementService } from '../../../services/paiement';
import { AnnonceService } from '../../../services/annonce';
import { MessageService } from '../../../services/message';
import { ConfigAcademiqueService } from '../../../services/config-academique';
import { NavItem } from '../../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-parent',
  standalone: false,
  templateUrl: './parent.html',
  styleUrls: ['./parent.scss'],
})
export class Parent implements OnInit {
  sidebarOpen = true;
  activeSection = 'suivi';
  userName = '';
  ecoleNom = '';

  enfants: any[] = [];
  enfantActif: any = null;
  notes: any[] = [];
  absences: any[] = [];
  absenceStats: any = { total_heures: 0, non_justifiees: 0 };
  scolarite: any = null;
  annonces: any[] = [];
  messages: any[] = [];
  nonLus = 0;
  periodes: string[] = [];

  selectedPeriode = '';
  isLoading = false;

  navItems: NavItem[] = [
    { id: 'suivi', label: 'Suivi de mes Enfants', icon: 'trending_up' },
    { id: 'annonces', label: "Annonces & Messages", icon: 'campaign' },
  ];

  constructor(
    private authService: AuthService,
    private eleveService: EleveService,
    private noteService: NoteService,
    private absenceService: AbsenceService,
    private paiementService: PaiementService,
    private annonceService: AnnonceService,
    private messageService: MessageService,
    private configService: ConfigAcademiqueService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('parent_nom') ?? 'Parent';
    this.loadConfig();
    this.loadEnfants();
    this.loadAnnonces();
    this.loadMessages();
  }

  loadConfig(): void {
    this.configService.getLibelles().subscribe({
      next: (data: any) => {
        this.periodes = data.periodes ?? [];
        if (this.periodes.length > 0) {
          this.selectedPeriode = this.periodes[0];
        }
        this.cdr.detectChanges();
      },
    });
  }

  loadEnfants(): void {
    this.eleveService.getMonEnfants().subscribe({
      next: (enfants: any[]) => {
        this.enfants = [...enfants];
        if (enfants.length > 0) {
          this.selectEnfant(enfants[0]);
        }
        this.cdr.detectChanges();
      },
    });
  }

  selectEnfant(enfant: any): void {
    this.enfantActif = enfant;
    this.ecoleNom = enfant.ecole?.nom ?? 'OTO School';
    this.loadNotes(enfant.id);
    this.loadAbsences(enfant.id);
    this.loadScolarite(enfant.id);
    this.cdr.detectChanges();
  }

  loadNotes(eleve_id: string): void {
    this.noteService.getNotesParEleve(eleve_id, this.selectedPeriode).subscribe({
      next: (notes: any[]) => {
        this.notes = [...notes];
        this.cdr.detectChanges();
      },
    });
  }

  loadAbsences(eleve_id: string): void {
    this.absenceService.getAbsencesEleve(eleve_id).subscribe({
      next: (data: any) => {
        this.absences = [...(data.absences ?? [])];
        this.absenceStats = {
          total_heures: data.total_heures ?? 0,
          non_justifiees: data.non_justifiees ?? 0,
        };
        this.cdr.detectChanges();
      },
    });
  }

  loadScolarite(eleve_id: string): void {
    this.paiementService.getSuiviScolariteEleve(eleve_id).subscribe({
      next: (data: any) => {
        this.scolarite = data;
        this.cdr.detectChanges();
      },
    });
  }

  loadAnnonces(): void {
    this.annonceService.listAnnoncesParent().subscribe({
      next: (annonces: any[]) => {
        this.annonces = [...annonces];
        this.cdr.detectChanges();
      },
    });
  }

  loadMessages(): void {
    this.messageService.getMessagesParent().subscribe({
      next: (messages: any[]) => {
        this.messages = [...messages];
        this.nonLus = messages.filter((m) => !m.lu).length;
        this.cdr.detectChanges();
      },
    });
  }

  changePeriode(): void {
    if (this.enfantActif) {
      this.loadNotes(this.enfantActif.id);
    }
  }

  getMoyenne(): number {
    if (this.notes.length === 0) return 0;
    const total = this.notes.reduce(
      (acc: number, n: any) => acc + Number(n.valeur), 0,
    );
    return Math.round((total / this.notes.length) * 100) / 100;
  }

  logout(): void {
    this.authService.logout();
  }
}