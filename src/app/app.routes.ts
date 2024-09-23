import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { PersonaComponent } from './pages/persona/persona.component';
import { MascotaComponent } from './pages/departamento/mascota.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'persona', component: PersonaComponent },
    { path: 'mascota', component: MascotaComponent }
  ];

  