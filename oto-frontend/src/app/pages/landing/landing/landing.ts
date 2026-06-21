import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../../services/contact';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss'],
})
export class Landing implements OnInit, OnDestroy {
  activeTab = 'accueil';
  activeRoleTab: 'admin' | 'parent' | 'teacher' = 'admin';
  isSubmitted = false;
  isScrolled = false;

  contactForm = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
  };
  isSubmittingContact = false;
  contactSuccess = '';
  contactError = '';

  

  navTabs = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'apropos', label: 'À propos' },
    { id: 'solution', label: 'Solutions' },
    { id: 'fonctionnalites', label: 'Fonctionnalités' },
    { id: 'contact', label: 'Contactez-nous' },
  ];

  adminFeatures = [
    { title: 'Gestion personnel', icon: 'groups', desc: 'Recruter, assigner et suivre les présences des professeurs et fonctionnaires.' },
    { title: 'Gestion comptabilité', icon: 'payments', desc: 'Saisie automatique des scolarités versées et rapports financiers.' },
    { title: 'Gestion inscriptions', icon: 'person_add', desc: 'Fiches élèves dématérialisées pour inscrire rapidement un nouvel arrivant.' },
    { title: 'Gestion ressources', icon: 'menu_book', desc: 'Création de classes, matières et attribution des emplois du temps.' },
    { title: 'Suivi des élèves', icon: 'trending_up', desc: 'Tableaux de bord des notes, bulletins périodiques et rapports.' },
    { title: "Publication d'annonce", icon: 'campaign', desc: 'Diffusion de communiqués officiels visibles instantanément.' },
    { title: 'Partage de documents', icon: 'folder_open', desc: "Dépôts numériques d'attestations scolaires et règlements." },
    { title: 'Bibliothèque numérique', icon: 'local_library', desc: 'Archivage sécurisé des anciennes épreuves et compositions.' },
  ];

  parentFeatures = [
    { title: 'Suivi & contrôle parental', icon: 'trending_up', desc: 'Consultabilité immédiate des notes, retards scolaires et assiduité.' },
    { title: 'Communication directe', icon: 'forum', desc: "Prise de rendez-vous en ligne avec l'administration." },
    { title: 'Bibliothèque de révision', icon: 'local_library', desc: 'Accès aux fiches de révision et documents partagés.' },
  ];

  teacherFeatures = [
    { title: "Communication avec l'école", icon: 'forum', desc: 'Relever les demandes administratives et informer des absences.' },
    { title: 'Ressources pédagogiques', icon: 'menu_book', desc: 'Enregistrer le programme et les devoirs prévus.' },
    { title: 'Partage de documents', icon: 'folder_open', desc: 'Distribuer exercices et lectures aux classes.' },
    { title: 'Bibliothèque numérique', icon: 'local_library', desc: 'Importation et consultation des épreuves corrigées.' },
  ];

  constructor(
    private router: Router,
    private contactService: ContactService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
    const sections = ['accueil', 'apropos', 'solution', 'fonctionnalites', 'contact'];
    const scrollPosition = window.scrollY + 200;

    for (const section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeTab = section;
        }
      }
    }
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      this.activeTab = id;
    }
  }

  goToPortal(): void {
    this.router.navigate(['/portal']);
  }

  goToParentLogin(): void {
    this.router.navigate(['/auth/login'], { queryParams: { type: 'parent' } });
  }

   submitContact(): void {
  if (!this.contactForm.nom || !this.contactForm.prenom ||
      !this.contactForm.email || !this.contactForm.telephone ||
      !this.contactForm.sujet || !this.contactForm.message) {
    this.contactError = 'Veuillez remplir tous les champs obligatoires';
    return;
  }

  this.contactError = '';
  this.isSubmittingContact = true;

  const payload = {
    nom: this.contactForm.nom,
    prenom: this.contactForm.prenom,
    email: this.contactForm.email,
    telephone: this.contactForm.telephone,
    sujet: this.contactForm.sujet,
    message: this.contactForm.message,
  };

  this.contactService.envoyerMessage(payload).subscribe({
    next: (res: any) => {
      this.isSubmittingContact = false;
      this.isSubmitted = true;
      this.contactSuccess = res.message || 'Votre message a bien été envoyé.';
      this.contactForm = { nom: '', prenom: '', email: '', telephone: '', sujet: '', message: '' };
       this.cdr.detectChanges();
      setTimeout(() => {
        this.isSubmitted = false;
        this.contactSuccess = '';
        this.cdr.detectChanges();
      }, 5000);
     
    },
    error: (err: any) => {
      this.isSubmittingContact = false;
      this.contactError = err.error?.message || 'Une erreur est survenue';
      this.cdr.detectChanges();
    },
  });
  }
}