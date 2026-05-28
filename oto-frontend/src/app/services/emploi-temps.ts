import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmploiTemps, EmploiTempsSaisie } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class EmploiTempsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  ajouterEmploiTemps(data: EmploiTempsSaisie): Observable<any> {
    return this.http.post(`${this.apiUrl}/emplois-temps`, data);
  }

  listEmploiTemps(search?: string): Observable<EmploiTemps[]> {
    let url = `${this.apiUrl}/emplois-temps`;
    if (search) {
      url += `?search=${search}`;
    }
    return this.http.get<EmploiTemps[]>(url);
  }

  getEmploiTempsProf(): Observable<EmploiTemps[]> {
    return this.http.get<EmploiTemps[]>(`${this.apiUrl}/emplois-temps/prof`);
  }

  getEmploiTempsSalle(salle_id: string): Observable<EmploiTemps> {
    return this.http.get<EmploiTemps>(`${this.apiUrl}/emplois-temps/salle/${salle_id}`);
  }

  deleteEmploiTemps(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/emplois-temps/${id}`);
  }
}
