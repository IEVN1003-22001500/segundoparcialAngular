import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Alumnosutl } from '../alumnosUTL';
import { ProyectoapiService } from '../alumnosapi.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  selector: 'app-agregar',
  templateUrl: './agregar.html',
})
export class Agregar implements OnInit {
  formGroup!: FormGroup;

  regAlumno: Alumnosutl = {
    matricula: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private fb: FormBuilder,
    public alumnosutl: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      matricula: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      console.log('El formulario contiene datos inválidos');
      return;
    }

    const rawValues = this.formGroup.getRawValue();

    const datos: Alumnosutl = {
      matricula: rawValues.matricula ? rawValues.matricula.toString().trim() : '',
      nombre: rawValues.nombre ? rawValues.nombre.trim() : '',
      apaterno: rawValues.apaterno ? rawValues.apaterno.trim() : '',
      amaterno: rawValues.amaterno ? rawValues.amaterno.trim() : '',
      correo: rawValues.correo ? rawValues.correo.trim() : ''
    };

    console.log('Datos que se enviarán:', datos);

    this.alumnosutl.agregarNuevoAlumno(datos).subscribe({
      next: (respuesta) => {
        console.log('Respuesta de Flask:', respuesta);
        alert('Alumno registrado correctamente');
        this.formGroup.reset();
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al registrar alumno:', error);
        const mensaje =
          error.error?.mensaje ||
          error.error?.error ||
          error.message ||
          'Ocurrió un error al registrar el alumno';
        alert(mensaje);
      }
    });
  }
}