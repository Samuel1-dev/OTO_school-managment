import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matiere } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class MatiereService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createMatiere(nom: string): Observable<Matiere> {
    return this.http.post<Matiere>(`${this.apiUrl}/matieres`, { nom });
  }

  listMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.apiUrl}/matieres`);
  }

  deleteMatiere(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/matieres/${id}`);
  }
}
