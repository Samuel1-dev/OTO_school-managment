import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  standalone: false,
  templateUrl: './portal.html',
  styleUrls: ['./portal.scss'],
})
export class Portal {
  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  goToInscription(): void {
    this.router.navigate(['/auth/inscription-ecole']);
  }

  goToInscriptionParent(): void {
    this.router.navigate(['/auth/inscription-parent']);
  }

  goToParentLogin(): void {
    this.router.navigate(['/auth/login'], { queryParams: { type: 'parent' } });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}