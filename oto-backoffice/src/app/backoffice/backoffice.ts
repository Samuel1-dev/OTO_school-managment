import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Subject } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-backoffice',
  standalone: false, // Reste à 'false' car vous utilisez probablement des NgModules
  template: `
    <div class="backoffice-container">
      <nav class="backoffice-navbar" *ngIf="isAuthenticated$ | async">
        <div class="navbar-brand">
          <h1>OTO School - Back Office</h1>
        </div>
        <div class="navbar-menu">
          <a 
            routerLink="/backoffice/dashboard" 
            routerLinkActive="active" 
            class="nav-link">
            Dashboard
          </a>
          <button (click)="logout()" class="btn-logout">Déconnexion</button>
        </div>
      </nav>

      <main class="backoffice-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .backoffice-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .backoffice-navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #2c3e50;
      color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .navbar-brand h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    
    .navbar-menu {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    
    .nav-link:hover,
    .nav-link.active {
      background-color: #34495e;
    }
    
    .btn-logout {
      background-color: #e74c3c;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .btn-logout:hover {
      background-color: #c0392b;
    }
    
    .backoffice-content {
      flex: 1;
      padding: 2rem;
      background-color: #ecf0f1;
    }
  `]
})
export class Backoffice implements OnInit, OnDestroy {
  // Injection moderne des services (Angular 14+)
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Propriétés
  readonly isAuthenticated$ = this.authService.token$;
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.checkAuthentication();
  }

  /**
   * Vérifie si l'utilisateur est authentifié, sinon le redirige
   */
  private checkAuthentication(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/backoffice/login']);
    }
  }

  /**
   * Déconnecte l'utilisateur après confirmation
   */
  logout(): void {
    const confirmLogout = confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    
    if (confirmLogout) {
      this.authService.logout();
      this.router.navigate(['/backoffice/login']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}