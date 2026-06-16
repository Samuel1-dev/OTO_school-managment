import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EcoleService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // École connectée
  getEcole(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ecole`);
  }

  updateEcole(data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/ecole`, data);
  }

  getStatistiques(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ecole/statistiques`);
  }

  getMesMatieres(): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/ecole/mes-matieres`);
}

  // Membres
  getMembres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ecole/membres`);
  }

  creerMembre(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ecole/membres`, data);
  }

  desactiverMembre(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/ecole/membres/${id}/desactiver`, {});
  }

  reactiverMembre(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/ecole/membres/${id}/reactiver`, {});
  }

  supprimerMembre(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/ecole/membres/${id}`);
  }
}