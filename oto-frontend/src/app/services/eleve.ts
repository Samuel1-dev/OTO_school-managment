import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eleve } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class EleveService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createEleve(data: {
    nom: string;
    prenom: string;
    sexe: 'masculin' | 'feminin';
    npi: string;
    date_naissance: string;
    lieu_naissance: string;
    quartier: string;
    nom_parent: string;
    contact_parent: string;
    email_parent: string;
    profession_parent: string;
    salle_id: string;
  }): Observable<Eleve> {
    return this.http.post<Eleve>(`${this.apiUrl}/eleves`, data);
  }

  listEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(`${this.apiUrl}/eleves`);
  }

  getEleveById(id: string): Observable<Eleve> {
    return this.http.get<Eleve>(`${this.apiUrl}/eleves/${id}`);
  }

  getElevesBySalle(salle_id: string): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(`${this.apiUrl}/eleves/salle/${salle_id}`);
  }

  getMonEnfants(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(`${this.apiUrl}/eleves/parent/mes-enfants`);
  }

  updateEleve(id: string, data: Partial<Eleve>): Observable<Eleve> {
    return this.http.patch<Eleve>(`${this.apiUrl}/eleves/${id}`, data);
  }

  desactiverEleve(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/eleves/${id}/desactiver`, {});
  }
}
