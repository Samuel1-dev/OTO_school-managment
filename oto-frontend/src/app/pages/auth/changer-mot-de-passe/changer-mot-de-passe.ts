import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-changer-mot-de-passe',
  standalone: false,
  templateUrl: './changer-mot-de-passe.html',
  styleUrls: ['./changer-mot-de-passe.scss'],
})
export class ChangerMotDePasse {
  isLoading = false;
  errorMessage = '';
  showAncien = false;
  showNouveau = false;
  showConfirm = false;

  form = {
    ancien_mot_de_passe: '',
    nouveau_mot_de_passe: '',
    confirmer_mot_de_passe: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (
      !this.form.ancien_mot_de_passe ||
      !this.form.nouveau_mot_de_passe ||
      !this.form.confirmer_mot_de_passe
    ) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    if (this.form.nouveau_mot_de_passe !== this.form.confirmer_mot_de_passe) {
      this.errorMessage = 'Les nouveaux mots de passe ne correspondent pas';
      return;
    }

    if (this.form.nouveau_mot_de_passe.length < 6) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }

    if (this.form.nouveau_mot_de_passe === this.form.ancien_mot_de_passe) {
      this.errorMessage = "Le nouveau mot de passe doit être différent de l'ancien";
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService
      .changerMotDePasse(
        this.form.ancien_mot_de_passe,
        this.form.nouveau_mot_de_passe,
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          const role = this.authService.getRole();
          this.router.navigate(['/dashboard/' + role]);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Une erreur est survenue';
        },
      });
  }
}