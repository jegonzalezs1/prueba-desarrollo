// form-persona.component.ts
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { PersonaService } from '../../../services/persona/persona.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IPersona } from '../../../shared/models/Persona';
import { FechaPipe } from '../../pipe/fecha-pipe.pipe';

@Component({
  selector: 'app-form-persona',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-persona.component.html',
  styleUrls: ['./form-persona.component.sass'],
})
export class FormPersonaComponent implements OnInit, OnChanges {
  @Input() data: IPersona | null = null;
  @Output() onCloseModel = new EventEmitter();

  formPersona!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private toastr: ToastrService
  ) {
    this.formPersona = this.fb.group({
      idPersona: new FormControl(0),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      identificacion: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      edad: new FormControl(0, [Validators.required]),
      estatura: new FormControl(0, [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.formPersona.patchValue({
        idPersona: this.data.idPersona,
        nombre: this.data.nombre,
        apellido: this.data.apellido,
        identificacion: this.data.identificacion,
        fechaNacimiento: this.formatFechaInput(this.data.fechaNacimiento),
        edad: this.data.edad,
        estatura: this.data.estatura,
        direccion: this.data.direccion,
        telefono: this.data.telefono,
      });
    }
  }
  
  onSubmit() {
    if (this.formPersona.valid) {
      if (this.data) {
        this.personaService.updatePersona(this.data.idPersona as number, this.formPersona.value).subscribe({
          complete: () => {
            this.resetForm();
            this.toastr.success("Se ha actualizado la persona");
          },
          error: () => {
            this.toastr.warning("Hubo un problema al actualizar los registros", "Información de la persona");
          }
        });
      } else {
        this.personaService.createPersona(this.formPersona.value).subscribe({
          complete: () => {
            this.resetForm();
            this.toastr.success("Se ha creado la persona");
          },
          error: () => {
            this.toastr.warning("Hubo un problema al guardar los registros", "Información de la persona");
          }
        });
      }
    } else {
      this.formPersona.markAllAsTouched();
    }
  }

  resetForm() {
    this.formPersona.reset();
    this.onClose();
  }

  // Método para formatear la fecha a YYYY-MM-DD
  formatFechaInput(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  }

  onDateChange(event: any) {
    const fechaFormateada = new FechaPipe();
    fechaFormateada.transform(event.target.value);
  }
}
