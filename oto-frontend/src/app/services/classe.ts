import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe, Tranche } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class ClasseService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createClasse(data: {
    nom: string;
    scolarite_totale: number;
    tranches: Tranche[];
  }): Observable<Classe> {
    return this.http.post<Classe>(`${this.apiUrl}/classes`, data);
  }

  listClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.apiUrl}/classes`);
  }

  getClasseById(id: string): Observable<Classe> {
    return this.http.get<Classe>(`${this.apiUrl}/classes/${id}`);
  }

  updateClasse(id: string, data: Partial<Classe>): Observable<Classe> {
    return this.http.patch<Classe>(`${this.apiUrl}/classes/${id}`, data);
  }

  deleteClasse(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/classes/${id}`);
  }
}
