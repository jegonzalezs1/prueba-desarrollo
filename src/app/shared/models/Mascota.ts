import { IPersona } from "./Persona";

export interface IMascota {
  idMascota?: number;
  nombre: string;
  especie: string;
  raza: string;
  color: string;
  edad: number;
  idPersona: number;
  dueno: IPersona;
}
