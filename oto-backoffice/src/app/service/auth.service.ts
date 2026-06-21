import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
  tap
} from 'rxjs';
import { Router } from '@angular/router';

export interface LoginResponse {
  access_token: string;
  role: string;
  mot_de_passe_change: boolean;
}

export interface LoginCredentials {
  email: string;
  mot_de_passe: string;
}

export interface ChangePasswordRequest {
  ancien_mot_de_passe: string;
  nouveau_mot_de_passe: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/backoffice';
  private tokenSubject = new BehaviorSubject<string | null>(this.getStoredToken());
  private roleSubject = new BehaviorSubject<string | null>(this.getStoredRole());

  public token$ = this.tokenSubject.asObservable();
  public role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient,     private router: Router
) {}

  /**
   * Connexion admin backoffice
   */
  loginBackoffice(email: string, mot_de_passe: string): Observable<LoginResponse> {
    const credentials: LoginCredentials = { email, mot_de_passe };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.setToken(response.access_token);
        this.setRole(response.role);
      })
    );
  }

  /**
   * Créer un compte admin backoffice
   */
  createAdminBackoffice(nom: string, email: string, mot_de_passe: string): Observable<any> {
    const body = { nom, email, mot_de_passe };
    return this.http.post(`${this.apiUrl}/creer-admin`, body);
  }

  /**
   * Changer le mot de passe (avec authentification requise)
   */
  changePassword(ancien_mot_de_passe: string, nouveau_mot_de_passe: string): Observable<any> {
    const body: ChangePasswordRequest = { ancien_mot_de_passe, nouveau_mot_de_passe };
    return this.http.post('/auth/changer-mot-de-passe', body);
  }

  /**
   * Récupérer le token depuis le localStorage
   */
  private getStoredToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Récupérer le rôle depuis le localStorage
   */
  private getStoredRole(): string | null {
    return localStorage.getItem('role');
  }

  /**
   * Stocker le token
   */
  private setToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.tokenSubject.next(token);
  }

  /**
   * Stocker le rôle
   */
  private setRole(role: string): void {
    localStorage.setItem('role', role);
    this.roleSubject.next(role);
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  /**
   * Récupérer le token actuel
   */
  getToken(): string | null {
    return this.getStoredToken();
  }

  /**
   * Récupérer le rôle actuel
   */
  getRole(): string | null {
    return this.getStoredRole();
  }

  /**
   * Se déconnecter
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    this.tokenSubject.next(null);
    this.roleSubject.next(null);
    this.router.navigate(['/backoffice/login']);
  }

  /**
   * Obtenir les headers d'authentification
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
