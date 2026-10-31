import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { AlumnoFilterPipe } from '../alumnos-filter.pipe';
import { Alumnosutl } from '../alumnosUTL';
import { ProyectoapiService } from '../alumnosapi.service';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    AlumnoFilterPipe,
    CommonModule
  ],
  selector: 'app-alumnos',
  templateUrl: './alumnos.html',
})

export class Alumnos implements OnInit {

  listFilter: string = '';

  alumnoTitle!: string;

  dataSource: Alumnosutl[] = [];

  constructor(
    public alumnosUtl: ProyectoapiService,
    private router: Router,
    private cdr: ChangeDetectorRef // <-- Añadido para actualizar la vista de inmediato al recargar
  ) {}

  alumnosIric = [
    {
      matricula: 1234,
      nombre: 'pedro',
      apaterno: 'lopez',
      amaterno: 'muñoz',
      correo: 'pedro@gmail.com',
    }
  ];

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnosUtl.getAlumnos().subscribe({
      next: (response: any) => {
        console.log('Datos recibidos del API:', response);

        // Validación segura para asignar el arreglo ya sea plano o dentro de una propiedad
        if (Array.isArray(response)) {
          this.dataSource = response;
        } else if (response && Array.isArray(response.alumnos)) {
          this.dataSource = response.alumnos;
        } else {
          this.dataSource = [];
        }

        console.log('Alumnos guardados en dataSource:', this.dataSource);
        
        // Fuerza a Angular a repintar la tabla al instante al recargar la página
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al consultar API:', error);
      },
      complete: () => {
        console.log('Carga de alumnos finalizada');
      }
    });
  }

}