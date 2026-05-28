import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Absence, AbsenceDetail, JustifierAbsencePayload } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  enregistrerAbsence(data: {
    eleve_id: string;
    duree_heures: number;
    motif?: string;
    justifiee: boolean;
    date: string;
  }): Observable<Absence> {
    return this.http.post<Absence>(`${this.apiUrl}/absences`, data);
  }

  getAbsencesEleve(eleve_id: string): Observable<AbsenceDetail> {
    return this.http.get<AbsenceDetail>(`${this.apiUrl}/absences/eleve/${eleve_id}`);
  }

  getAbsencesSalle(salle_id: string): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.apiUrl}/absences/salle/${salle_id}`);
  }

  getAbsencesEcole(): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.apiUrl}/absences/ecole`);
  }

  justifierAbsence(id: string, payload: JustifierAbsencePayload): Observable<any> {
    return this.http.patch(`${this.apiUrl}/absences/${id}/justifier`, payload);
  }

  contacterParent(eleve_id: string, message: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/absences/eleve/${eleve_id}/contacter-parent`,
      { message }
    );
  }
}
