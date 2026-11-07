import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProyectoapiService } from '../alumnosapi.service';
import { Alumnosutl } from '../alumnosUTL';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  selector: 'app-editar',
  templateUrl: './editar.html',
})
export class Editar implements OnInit {
  formulario!: FormGroup;
  matricula: string = '';

  constructor(
    private route: ActivatedRoute,
    public alumnosUtl: ProyectoapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      matricula: [{ value: '', disabled: true }], // Matrícula bloqueada para no romper la llave primaria
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });

    // Captura limpia de la matrícula desde la ruta
    this.matricula = this.route.snapshot.paramMap.get('matricula') || this.route.snapshot.paramMap.get('id') || '';

    if (this.matricula) {
      this.alumnosUtl.getAlumno(this.matricula).subscribe({
        next: (response: any) => {
          const alumnoData = response.alumno || response;
          if (alumnoData) {
            this.formulario.patchValue(alumnoData);
          }
        },
        error: (error) => {
          console.error('Error al consultar el alumno:', error);
          alert('No se pudo cargar la información del alumno');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    // getRawValue incluye la matrícula deshabilitada para enviarla al backend
    const alumno: Alumnosutl = this.formulario.getRawValue();

    this.alumnosUtl.modificarAlumno(this.matricula, alumno).subscribe({
      next: (response) => {
        alert('Alumno actualizado correctamente');
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        const mensaje = error.error?.mensaje || 'Ocurrió un error al actualizar el alumno';
        alert(mensaje);
      }
    });
  }
}