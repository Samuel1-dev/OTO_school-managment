import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

export interface EcoleResponse {
  id: string;
  nom: string;
  ville: string;
  boite_postale: string;
  nom_fondateur: string;
  email: string;
  telephone: string;
  description?: string;
  status?: string;
  statut?: string; // Alias pour status
  created_at?: string;
  updated_at?: string;
}

export interface EcoleListResponse {
  ecoles: EcoleResponse[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class EcoleService {
  private apiUrl = 'http://localhost:3000/backoffice';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Récupérer la liste de toutes les écoles (Auth requise)
   */
  getAllEcoles(): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/ecoles`, { headers });
  }

  /**
   * Récupérer les écoles en attente de validation (Auth requise)
   */
  getEcolesPending(): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/ecoles/en-attente`, { headers });
  }

  /**
   * Valider une école (Auth requise)
   * @param ecoleId ID de l'école à valider
   */
  validateEcole(ecoleId: string): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.patch<any>(`${this.apiUrl}/ecoles/${ecoleId}/valider`, {}, { headers });
  }

  /**
   * Rejeter une école (Auth requise) - si cette route existe
   * @param ecoleId ID de l'école
   */
  rejectEcole(ecoleId: string, raison?: string): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    const body = raison ? { raison } : {};
    return this.http.patch<any>(`${this.apiUrl}/ecoles/${ecoleId}/rejeter`, body, { headers });
  }

  /**
   * Obtenir les détails d'une école (Auth requise)
   * @param ecoleId ID de l'école
   */
  getEcoleDetails(ecoleId: string): Observable<EcoleResponse> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<EcoleResponse>(`${this.apiUrl}/ecoles/${ecoleId}`, { headers });
  }

  /**
   * Supprimer une école (Auth requise)
   * @param ecoleId ID de l'école
   */
  deleteEcole(ecoleId: string): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/ecoles/${ecoleId}`, { headers });
  }
}
