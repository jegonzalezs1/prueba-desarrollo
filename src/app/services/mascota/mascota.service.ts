// mascota.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMascota } from '../../shared/models/Mascota';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  urlApp = environment.urlAddress;
  urlApi = 'api/mascota/';

  constructor(private http: HttpClient) {}

  getAllMascotas(): Observable<IMascota[]> {
    return this.http.get<IMascota[]>(`${this.urlApp}${this.urlApi}`);
  }

  getMascota(idMascota: number): Observable<IMascota> {
    return this.http.get<IMascota>(`${this.urlApp}${this.urlApi}${idMascota}`);
  }

  createMascota(mascota: IMascota): Observable<IMascota> {
    return this.http.post<IMascota>(`${this.urlApp}${this.urlApi}`, mascota);
  }

  updateMascota(idMascota: number, mascota: IMascota): Observable<IMascota> {
    return this.http.put<IMascota>(`${this.urlApp}${this.urlApi}${idMascota}`, mascota);
  }

  deleteMascota(idMascota: number): Observable<IMascota> {
    return this.http.delete<IMascota>(`${this.urlApp}${this.urlApi}${idMascota}`);
  }
}
