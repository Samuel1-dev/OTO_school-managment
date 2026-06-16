import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  envoyerMessage(eleve_id: string, data: { contenu: string; sujet: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/messages/eleve/${eleve_id}`, data);
  }

  getMessagesParent(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages/mes-messages`);
  }

  getNonLus(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/messages/non-lus`);
  }
}