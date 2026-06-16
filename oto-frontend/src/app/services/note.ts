import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note, NoteSaisie, MoyenneEleve } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

 saisirNotes(payload: {
    matiere: string;
    salle_id: string;
    trimestre: string;
    libelles_notes: { libelle: string; notes: { eleve_id: string; valeur: number }[] }[];
  }): Observable<any> {
      return this.http.post(`${this.apiUrl}/notes`, payload);
  }
  getNotesParSalle(salle_id: string, trimestre?: string): Observable<Note[]> {
    let url = `${this.apiUrl}/notes/salle/${salle_id}`;
    if (trimestre) {
      url += `?trimestre=${trimestre}`;
    }
    return this.http.get<Note[]>(url);
  }

  getNotesParEleve(eleve_id: string, trimestre?: string): Observable<Note[]> {
    let url = `${this.apiUrl}/notes/eleve/${eleve_id}`;
    if (trimestre) {
      url += `?trimestre=${trimestre}`;
    }
    return this.http.get<Note[]>(url);
  }

  getMoyenneEleve(eleve_id: string, trimestre: string): Observable<MoyenneEleve> {
    return this.http.get<MoyenneEleve>(
      `${this.apiUrl}/notes/eleve/${eleve_id}/moyenne?trimestre=${trimestre}`
    );
  }

  getMesNotes(salle_id?: string, trimestre?: string): Observable<Note[]> {
    let url = `${this.apiUrl}/notes/prof/mes-notes`;
    const params = [];
    if (salle_id) params.push(`salle_id=${salle_id}`);
    if (trimestre) params.push(`trimestre=${trimestre}`);
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    return this.http.get<Note[]>(url);
  }

  getNotesBySalleCompletes(
  salle_id: string,
  trimestre?: string,
  matiere?: string,
): Observable<any[]> {
  let url = `${this.apiUrl}/notes/salle/${salle_id}/completes`;
  const params: string[] = [];
  if (trimestre) params.push(`trimestre=${encodeURIComponent(trimestre)}`);
  if (matiere) params.push(`matiere=${encodeURIComponent(matiere)}`);
  if (params.length > 0) url += '?' + params.join('&');
  return this.http.get<any[]>(url);
}

getMatieresParSalle(salle_id: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/notes/salle/${salle_id}/matieres`);
}
}
