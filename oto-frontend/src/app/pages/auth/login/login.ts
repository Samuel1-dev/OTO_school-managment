import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  isParent = false;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  form = {
    email: '',
    mot_de_passe: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.isParent = params['type'] === 'parent';
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

 onSubmit(): void {
  if (!this.form.email || !this.form.mot_de_passe) {
    this.errorMessage = 'Veuillez remplir tous les champs';
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';

  if (this.isParent) {
    this.authService.loginParent(this.form.email, this.form.mot_de_passe).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Identifiants incorrects';
      },
    });
  } else {
    this.authService.login(this.form.email, this.form.mot_de_passe).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Identifiants incorrects';
      },
    });
  }
}
  goBack(): void {
    this.router.navigate(['/portal']);
  }

  goToInscription(): void {
    if (this.isParent) {
      this.router.navigate(['/auth/inscription-parent']);
    } else {
      this.router.navigate(['/auth/inscription-ecole']);
    }
  }
}