import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatiereService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  listMatieres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/matieres`);
  }

  creerMatiere(nom: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/matieres`, { nom });
  }

  supprimerMatiere(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/matieres/${id}`);
  }

  getMesMatieres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/matieres/prof/mes-matieres`);
  }

  getMatieresByProf(user_id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/matieres/prof/${user_id}`);
  }
}