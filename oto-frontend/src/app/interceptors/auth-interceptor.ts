import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && token) {
          const url = request.url;
          const isPublicRoute =
            url.includes('/auth/login') ||
            url.includes('/parents/login') ||
            url.includes('/auth/inscription') ||
            url.includes('/parents/inscription') ||
            url.includes('/backoffice/login');

          if (!isPublicRoute) {
            localStorage.clear();
            this.router.navigate(['/auth/login']);
          }
        }
        return throwError(() => error);
      }),
    );
  }
}