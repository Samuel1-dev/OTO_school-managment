import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  @Input() ecoleNom = '';
  @Input() role = '';
  @Input() userName = '';
  @Output() toggleSidebar = new EventEmitter<void>();

  showUserMenu = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  getRoleLabel(): string {
    const labels: Record<string, string> = {
      admin: 'Administrateur',
      professeur: 'Professeur',
      secretaire: 'Secrétaire',
      superviseur: 'Superviseur',
      parent: 'Parent d\'Élève',
    };
    return labels[this.role] ?? this.role;
  }

  getRoleColor(): string {
    const colors: Record<string, string> = {
      admin: 'sky',
      professeur: 'green',
      secretaire: 'orange',
      superviseur: 'purple',
      parent: 'indigo',
    };
    return colors[this.role] ?? 'sky';
  }

  logout(): void {
    this.authService.logout();
  }

  toggleMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }
}