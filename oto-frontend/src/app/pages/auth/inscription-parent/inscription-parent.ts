import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-inscription-parent',
  standalone: false,
  templateUrl: './inscription-parent.html',
  styleUrls: ['./inscription-parent.scss'],
})
export class InscriptionParent {
  isLoading = false;
  errorMessage = '';
  isSuccess = false;
  showPassword = false;
  showConfirmPassword = false;

  form = {
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    confirmer_mot_de_passe: '',
    telephone: '',
    profession: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (
      !this.form.nom ||
      !this.form.prenom ||
      !this.form.email ||
      !this.form.mot_de_passe
    ) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    if (this.form.mot_de_passe !== this.form.confirmer_mot_de_passe) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    if (this.form.mot_de_passe.length < 6) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.inscrireParent({
      nom: this.form.nom,
      prenom: this.form.prenom,
      email: this.form.email,
      mot_de_passe: this.form.mot_de_passe,
      telephone: this.form.telephone,
      profession: this.form.profession,
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.isSuccess = true;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Une erreur est survenue';
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login'], { queryParams: { type: 'parent' } });
  }

  goBack(): void {
    this.router.navigate(['/portal']);
  }
}
