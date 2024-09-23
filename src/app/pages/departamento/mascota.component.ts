import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IMascota } from '../../shared/models/Mascota';
import { MascotaService } from '../../services/mascota/mascota.service';
import { PersonaService } from '../../services/persona/persona.service';
import { ModelComponent } from '../../shared/ui/model/model.component';
import { FormMascotaComponent } from './form-mascota/form-mascota.component';
import { IPersona } from '../../shared/models/Persona';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [ModelComponent, FormMascotaComponent],
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.sass'],
})
export class MascotaComponent implements OnInit {
  isModelOpen = false;
  mascotas: IMascota[] = [];
  personas: IPersona[] = [];
  mascota!: IMascota;

  constructor(
    private mascotaService: MascotaService,
    private personaService: PersonaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllMascotas();
    this.getAllPersonas();
  }

  getAllMascotas() {
    this.mascotaService.getAllMascotas().subscribe({
      next: (response) => {
        if (response) {
          this.mascotas = response;
        }
      },
    });
  }

  getAllPersonas() {
    this.personaService.getAllPersonas().subscribe({
      next: (response) => {
        if (response) {
          this.personas = response;
        }
      },
    });
  }

  loadMascota(mascota: IMascota) {
    this.mascota = mascota;
    this.openModel();
  }

  deleteMascota(idMascota: number) {
    this.mascotaService.deleteMascota(idMascota).subscribe({
      complete: () => {
        this.toastr.success("Se ha eliminado la mascota");
        this.getAllMascotas();
      },
      error: () => {
        this.toastr.warning("Hubo un problema al eliminar los registros", "Información de la mascota");
      }
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllMascotas();
  }
}
