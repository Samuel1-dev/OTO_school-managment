import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolePersonnaliseService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getActions(): Observable<{ id: string; label: string }[]> {
    return this.http.get<{ id: string; label: string }[]>(
      `${this.apiUrl}/roles-personnalises/actions`,
    );
  }

  listRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles-personnalises`);
  }

  creerRole(data: { titre: string; actions: string[] }): Observable<any> {
    return this.http.post(`${this.apiUrl}/roles-personnalises`, data);
  }

  supprimerRole(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/roles-personnalises/${id}`);
  }
}