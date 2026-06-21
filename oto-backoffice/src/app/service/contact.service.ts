import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface ContactMessageResponse {
  id: string;
  nom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
  traite: boolean;
  reponse?: string;
  repondu_at?: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/contact';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  listMessages(): Observable<ContactMessageResponse[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<ContactMessageResponse[]>(this.apiUrl, { headers });
  }

  countNonTraites(): Observable<number> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<number>(`${this.apiUrl}/non-traites/count`, { headers });
  }

  repondre(id: string, reponse: string): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.patch(`${this.apiUrl}/${id}/repondre`, { reponse }, { headers });
  }

  supprimerMessage(id: string): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}