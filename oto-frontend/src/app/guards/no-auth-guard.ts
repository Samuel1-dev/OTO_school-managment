import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');

    if (token && role) {
      this.router.navigate(['/dashboard/' + role]);
      return false;
    }
    return true;
  }
}