import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMascota } from '../../../shared/models/Mascota';
import { PersonaService } from '../../../services/persona/persona.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IPersona } from '../../../shared/models/Persona';
import { MascotaService } from '../../../services/mascota/mascota.service';

@Component({
  selector: 'app-form-mascota',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-mascota.component.html',
  styleUrls: ['./form-mascota.component.sass'],
})
export class FormMascotaComponent implements OnChanges {
  @Input() data: IMascota | null = null;
  @Output() onCloseModel = new EventEmitter();

  formMascota!: FormGroup;
  personas: IPersona[] = [];

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private mascotaService: MascotaService,
    private toastr: ToastrService
  ) {
    this.formMascota = this.fb.group({
      idMascota: new FormControl(0),
      nombre: new FormControl('', [Validators.required]),
      especie: new FormControl('', [Validators.required]),
      raza: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      edad: new FormControl(0, [Validators.required]),
      idPersona: new FormControl(null, [Validators.required]), // Combo para seleccionar persona
    });

    this.getAllPersonas(); // Cargar personas al iniciar el componente
  }

  getAllPersonas() {
    this.personaService.getAllPersonas().subscribe({
      next: (response) => {
        this.personas = response;
      },
      error: () => {
        this.toastr.warning("Error al cargar las personas", "Información");
      }
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.formMascota.patchValue({
        idMascota: this.data.idMascota,
        nombre: this.data.nombre,
        especie: this.data.especie,
        raza: this.data.raza,
        color: this.data.color,
        edad: this.data.edad,
        idPersona: this.data.idPersona,
      });
    }
  }

  onSubmit() {
    if (this.formMascota.valid) {
      if (this.data) {
        this.mascotaService.updateMascota(this.data.idMascota as number, this.formMascota.value).subscribe({
          complete: () => {
            this.resetFormMascota();
            this.toastr.success("Se ha actualizado la mascota");
          },
          error: () => {
            this.toastr.warning("Hubo un problema al actualizar los registros", "Información de la mascota");
          }
        });
      } else {
        this.mascotaService.createMascota(this.formMascota.value).subscribe({
          complete: () => {
            this.resetFormMascota();
            this.toastr.success("Se ha creado la mascota");
          },
          error: () => {
            this.toastr.warning("Hubo un problema al guardar los registros", "Información de la mascota");
          }
        });
      }
    } else {
      this.formMascota.markAllAsTouched();
    }
  }

  resetFormMascota() {
    this.formMascota.reset();
    this.onClose();
  }
}
