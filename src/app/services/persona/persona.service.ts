// persona.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPersona } from '../../shared/models/Persona';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  urlApp = environment.urlAddress;
  urlApi = 'api/persona/';

  constructor(private http: HttpClient) {}

  getAllPersonas(): Observable<IPersona[]> {
    return this.http.get<IPersona[]>(`${this.urlApp}${this.urlApi}`);
  }

  getPersona(idPersona: number): Observable<IPersona> {
    return this.http.get<IPersona>(`${this.urlApp}${this.urlApi}${idPersona}`);
  }

  createPersona(persona: IPersona): Observable<IPersona> {
    return this.http.post<IPersona>(`${this.urlApp}${this.urlApi}`, persona);
  }

  updatePersona(idPersona: number, persona: IPersona): Observable<IPersona> {
    return this.http.put<IPersona>(`${this.urlApp}${this.urlApi}${idPersona}`, persona);
  }

  deletePersona(idPersona: number): Observable<IPersona> {
    return this.http.delete<IPersona>(`${this.urlApp}${this.urlApi}${idPersona}`);
  }
}
