import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Annonce, AnnonceSaisie } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  publierAnnonce(data: AnnonceSaisie): Observable<any> {
    return this.http.post(`${this.apiUrl}/annonces`, data);
  }

  listAnnonces(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiUrl}/annonces`);
  }

  listAnnoncesParent(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiUrl}/annonces/parent`);
  }

  deleteAnnonce(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/annonces/${id}`);
  }
}
