import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement, PaiementSaisie, ScolariteEleve } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class PaiementService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  enregistrerPaiement(data: PaiementSaisie): Observable<any> {
    return this.http.post(`${this.apiUrl}/paiements`, data);
  }

  getSuiviScolariteEleve(eleve_id: string): Observable<ScolariteEleve> {
    return this.http.get<ScolariteEleve>(`${this.apiUrl}/paiements/eleve/${eleve_id}`);
  }

  getSuiviScolariteEcole(): Observable<any> {
    return this.http.get(`${this.apiUrl}/paiements/ecole`);
  }

  contacterParentScolarite(eleve_id: string, message: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/paiements/eleve/${eleve_id}/contacter-parent`,
      { message }
    );
  }
}
