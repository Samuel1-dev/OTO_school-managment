import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable,
  throwError
} from 'rxjs';
import {
  catchError
} from 'rxjs/operators';

import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ajouter le token aux requêtes authentifiées
    const token = this.authService.getToken();
    if (token && req.url.includes('/backoffice/')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si erreur 401 (non authentifié), rediriger vers login
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/backoffice/login']);
        }

        // Si erreur 403 (non autorisé)
        if (error.status === 403) {
          console.error('Accès refusé:', error);
        }

        return throwError(() => error);
      })
    );
  }
}
