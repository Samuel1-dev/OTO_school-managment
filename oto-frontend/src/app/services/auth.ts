import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import {
  LoginResponse,
  InscriptionEcolePayload,
  InscriptionParentPayload,
  ParentLoginResponse,
  ChangerMotDePassePayload,
} from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');
    if (token && role) {
      this.currentUserSubject.next({ role });
    }
  }

  // Connexion personnel école
  login(email: string, mot_de_passe: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, mot_de_passe })
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('role', response.role);
          this.currentUserSubject.next(response);

          if (!response.mot_de_passe_change) {
            this.router.navigate(['/auth/changer-mot-de-passe']);
          } else {
            this.router.navigate(['/dashboard/' + response.role]);
          }
        })
      );
  }

  // Connexion parent
  loginParent(email: string, mot_de_passe: string): Observable<ParentLoginResponse> {
    return this.http
      .post<ParentLoginResponse>(`${this.apiUrl}/parents/login`, { email, mot_de_passe })
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('role', 'parent');
          localStorage.setItem('parent_id', response.parent.id);
          localStorage.setItem('parent_nom', `${response.parent.nom} ${response.parent.prenom}`);
          this.currentUserSubject.next({ role: 'parent', parent: response.parent });
          this.router.navigate(['/dashboard/parent']);
        })
      );
  }

  // Inscription école
  inscrireEcole(payload: InscriptionEcolePayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/inscription-ecole`, payload);
  }

  // Inscription parent
  inscrireParent(payload: InscriptionParentPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/parents/inscription`, payload);
  }

  // Changer mot de passe
  changerMotDePasse(ancien: string, nouveau: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/changer-mot-de-passe`, {
      ancien_mot_de_passe: ancien,
      nouveau_mot_de_passe: nouveau,
    });
  }

  // Connexion back office
  loginBackoffice(email: string, mot_de_passe: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/backoffice/login`, { email, mot_de_passe })
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('role', 'backoffice_admin');
          this.currentUserSubject.next(response);
          this.router.navigate(['/dashboard/backoffice']);
        })
      );
  }

  // Créer compte back office
  creerAdminBackoffice(nom: string, email: string, mot_de_passe: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/backoffice/creer-admin`, {
      nom,
      email,
      mot_de_passe,
    });
  }

  // Déconnexion
  logout(): void {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  // Utilitaires
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}