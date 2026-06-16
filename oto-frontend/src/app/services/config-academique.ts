import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigAcademiqueService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getConfig(): Observable<any> {
    return this.http.get(`${this.apiUrl}/config-academique`);
  }

  getLibelles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/config-academique/libelles`);
  }

  updateConfig(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/config-academique`, data);
  }
}