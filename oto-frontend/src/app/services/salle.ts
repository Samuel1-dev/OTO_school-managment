import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salle, SalleProfesseur, MethodeEvaluation } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class SalleService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createSalle(data: {
    classe_id: string;
    option: string;
    annee_academique: string;
    effectif_max: number;
    prof_principal_id: string;
    professeurs: SalleProfesseur[];
  }): Observable<Salle> {
    return this.http.post<Salle>(`${this.apiUrl}/salles`, data);
  }

  listSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${this.apiUrl}/salles`);
  }

  getSalleById(id: string): Observable<Salle> {
    return this.http.get<Salle>(`${this.apiUrl}/salles/${id}`);
  }

  deleteSalle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/salles/${id}`);
  }

  setMethodesEvaluation(
    classe_id: string,
    methodes: { libelle: string }[]
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/salles/classes/${classe_id}/methodes`, {
      methodes,
    });
  }

  getMethodesEvaluation(classe_id: string): Observable<MethodeEvaluation[]> {
    return this.http.get<MethodeEvaluation[]>(
      `${this.apiUrl}/salles/classes/${classe_id}/methodes`
    );
  }

  affecterProfesseur(salle_id: string, data: { user_id: string; matiere: string; coefficient: number }): Observable<any> {
  return this.http.post(`${this.apiUrl}/salles/${salle_id}/professeurs`, data);
}

retirerProfesseur(salle_id: string, user_id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/salles/${salle_id}/professeurs/${user_id}`);
}

getProfesseursBySalle(salle_id: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/salles/${salle_id}/professeurs`);
}

getMesSalles(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/salles/mes-salles/prof`);
}

}
