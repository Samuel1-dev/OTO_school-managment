import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-inscription-ecole',
  standalone: false,
  templateUrl: './inscription-ecole.html',
  styleUrls: ['./inscription-ecole.scss'],
})
export class InscriptionEcole {
  currentStep = 1;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  ecoleForm = {
    nom: '',
    ville: '',
    boite_postale: '',
    nom_fondateur: '',
    email: '',
    telephone: '',
    description: '',
  };

  adminForm = {
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    confirmer_mot_de_passe: '',
    telephone: '',
  };

  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  nextStep(): void {
    if (
      !this.ecoleForm.nom ||
      !this.ecoleForm.ville ||
      !this.ecoleForm.nom_fondateur ||
      !this.ecoleForm.email ||
      !this.ecoleForm.telephone
    ) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return;
    }
    this.errorMessage = '';
    this.currentStep = 2;
  }

  prevStep(): void {
    this.currentStep = 1;
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (
      !this.adminForm.nom ||
      !this.adminForm.prenom ||
      !this.adminForm.email ||
      !this.adminForm.mot_de_passe
    ) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    if (this.adminForm.mot_de_passe !== this.adminForm.confirmer_mot_de_passe) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    if (this.adminForm.mot_de_passe.length < 6) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const payload = {
      ecole: {
        nom: this.ecoleForm.nom,
        ville: this.ecoleForm.ville,
        boite_postale: this.ecoleForm.boite_postale,
        nom_fondateur: this.ecoleForm.nom_fondateur,
        email: this.ecoleForm.email,
        telephone: this.ecoleForm.telephone,
        description: this.ecoleForm.description,
      },
      admin: {
        nom: this.adminForm.nom,
        prenom: this.adminForm.prenom,
        email: this.adminForm.email,
        mot_de_passe: this.adminForm.mot_de_passe,
        telephone: this.adminForm.telephone,
      },
    };

    this.authService.inscrireEcole(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.currentStep = 3;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Une erreur est survenue';
        this.cdr.detectChanges();
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  goBack(): void {
    this.router.navigate(['/portal']);
  }
}