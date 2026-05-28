import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Epreuve, EpreuveSaisie } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class EpreuveService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  publierEpreuve(data: EpreuveSaisie): Observable<any> {
    return this.http.post(`${this.apiUrl}/epreuves`, data);
  }

  listEpreuves(search?: string, matiere_id?: string): Observable<Epreuve[]> {
    let url = `${this.apiUrl}/epreuves`;
    const params = [];
    if (search) params.push(`search=${search}`);
    if (matiere_id) params.push(`matiere_id=${matiere_id}`);
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    return this.http.get<Epreuve[]>(url);
  }

  getEpreuvesSalle(salle_id: string, search?: string): Observable<Epreuve[]> {
    let url = `${this.apiUrl}/epreuves/salle/${salle_id}`;
    if (search) {
      url += `?search=${search}`;
    }
    return this.http.get<Epreuve[]>(url);
  }

  getEpreuveById(id: string): Observable<Epreuve> {
    return this.http.get<Epreuve>(`${this.apiUrl}/epreuves/${id}`);
  }

  deleteEpreuve(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/epreuves/${id}`);
  }
}
