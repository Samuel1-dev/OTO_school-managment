import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ecole } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class EcoleService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  listEcoles(): Observable<Ecole[]> {
    return this.http.get<Ecole[]>(`${this.apiUrl}/backoffice/ecoles`);
  }

  listEcolesEnAttente(): Observable<Ecole[]> {
    return this.http.get<Ecole[]>(`${this.apiUrl}/backoffice/ecoles/en-attente`);
  }

  validerEcole(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/backoffice/ecoles/${id}/valider`, {});
  }

  rejeterEcole(id: string, motif: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/backoffice/ecoles/${id}/rejeter`, { motif });
  }
}
