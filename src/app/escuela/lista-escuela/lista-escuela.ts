
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { IAlumno } from '../alumno';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'lista-escuela',
  styleUrl: './lista-escuela.css',
  templateUrl: './lista-escuela.html',
})
export class ListaEscuela implements OnInit {

  formulario!: FormGroup;
  alumnos: IAlumno[] = [];

  nuevoAlumno: IAlumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: '',
  };

  ngOnInit(): void {

    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl(''),
    });

    this.cargarAlumnos();
  }

  agregarAlumno(): void {

    if (
      this.nuevoAlumno.matricula === '' ||
      this.nuevoAlumno.nombre === '' ||
      this.nuevoAlumno.correo === '' ||
      this.nuevoAlumno.materia === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    this.alumnos.push({ ...this.nuevoAlumno });

    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );

    alert('Alumno registrado correctamente');

    this.formulario.reset();

    this.nuevoAlumno = {
      matricula: '',
      nombre: '',
      correo: '',
      materia: '',
    };
  }

  muestraAlumno(): void {

    this.nuevoAlumno.matricula =
      this.formulario.value.matricula?.trim() ?? '';

    this.nuevoAlumno.nombre =
      this.formulario.value.nombre?.trim() ?? '';

    this.nuevoAlumno.correo =
      this.formulario.value.correo?.trim() ?? '';

    this.nuevoAlumno.materia =
      this.formulario.value.materia?.trim() ?? '';

    this.agregarAlumno();
  }

  cargarAlumnos(): void {

    const datos = localStorage.getItem('alumnos');

    if (datos) {
      this.alumnos = JSON.parse(datos);
    } else {
      this.alumnos = [];
    }
  }

  editarAlumno(i: number): void {

    const alumno = this.alumnos[i];

    if (alumno) {
      this.formulario.patchValue({
        matricula: alumno.matricula,
        nombre: alumno.nombre,
        correo: alumno.correo,
        materia: alumno.materia,
      });

      this.alumnos.splice(i, 1);

      localStorage.setItem(
        'alumnos',
        JSON.stringify(this.alumnos)
      );
    }
  }

  eliminarAlumno(i: number): void {

    if (confirm('¿Estás seguro de eliminar este alumno?')) {

      this.alumnos.splice(i, 1);

      localStorage.setItem(
        'alumnos',
        JSON.stringify(this.alumnos)
      );
    }
  }

}
