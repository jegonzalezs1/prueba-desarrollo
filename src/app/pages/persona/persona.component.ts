// persona.component.ts
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from '../../services/persona/persona.service';
import { IPersona } from '../../shared/models/Persona';
import { FormPersonaComponent } from './form-persona/form-persona.component';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { DatePipe } from '@angular/common';
import { FechaPipe } from '../pipe/fecha-pipe.pipe';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [ModelComponent, FormPersonaComponent],
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.sass'],
})
export class PersonaComponent implements OnInit {
  isModelOpen = false;
  personas: IPersona[] = [];
  persona!: IPersona;

  constructor(
    private personaService: PersonaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllPersona();
  }

  getAllPersona() {
    this.personaService.getAllPersonas().subscribe({
      next: (response) => {
        if (response) {
          this.personas = response;
        }
      },
    });
  }

  loadPersona(persona: IPersona) {
    this.persona = persona;
    this.openModel();
  }

  deletePersona(id: number) {
    this.personaService.deletePersona(id).subscribe({
      complete: () => {
        this.toastr.success("Se ha eliminado la persona");
        this.getAllPersona();
      },
      error: () => {
        this.toastr.warning("Hubo un problema al eliminar los registros", "Información de la persona");
      }
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllPersona();
  }

  obtenerFecha(fecha: Date) {
    const pipe = new FechaPipe();
    return pipe.transform(fecha);
  }
}
