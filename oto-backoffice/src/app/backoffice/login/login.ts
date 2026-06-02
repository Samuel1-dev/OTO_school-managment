import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-backoffice-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: [
    './login.scss'
  ]
})
export class Login implements OnInit, OnDestroy {
  email = '';
  motDePasse = '';
  showPassword = false;
  loading = false;
  erreur = '';
  messageSucces = '';
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est déjà connecté
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/backoffice/dashboard']);
    }

    // Vérifier s'il y a un message dans les query parameters
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['message']) {
        this.messageSucces = params['message'];
      }
    });
  }

  /**
   * Basculer la visibilité du mot de passe
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Soumettre le formulaire de connexion
   */
  onSubmit(): void {
    // Validation des champs
    if (!this.email || !this.motDePasse) {
      this.erreur = 'Veuillez remplir tous les champs.';
      return;
    }

    // Validation du format email basique
    if (!this.isValidEmail(this.email)) {
      this.erreur = 'Veuillez entrer une adresse email valide.';
      return;
    }

    this.loading = true;
    this.erreur = '';
    this.messageSucces = '';

    this.authService.loginBackoffice(this.email, this.motDePasse)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
            this.loading = false,
            this.router.navigate(['/backoffice/dashboard']);
          
        },
        error: (err) => {
          this.loading = false;
          console.error('Erreur lors de la connexion:', err);
          this.erreur = err?.error?.message || 'Identifiants incorrects. Veuillez réessayer.';
        }
      });
  }

  /**
   * Valider le format d'un email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Nettoyer les ressources
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
