import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProyectoapiService } from '../alumnosapi.service';
import { Alumnosutl } from '../alumnosUTL'; // Asegúrate de que coincida con el nombre exportado en tu archivo alumnosUTL.ts

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-eliminar',
  templateUrl: './eliminar.html',
})
export class Eliminar implements OnInit {
  matricula: string = '';
  regAlumno: Alumnosutl = {
    matricula: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private route: ActivatedRoute,
    public alumnosUtl: ProyectoapiService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Captura limpia del parámetro de la ruta
    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';

    if (this.matricula) {
      this.alumnosUtl.getAlumno(this.matricula).subscribe({
        next: (response: any) => {
          const datosAlumno = response.alumno || response;
          if (datosAlumno) {
            this.regAlumno = datosAlumno;
          }
        },
        error: (error) => {
          console.error('Error al consultar el alumno:', error);
          alert('No se pudo cargar la información del alumno');
        }
      });
    }
  }

  // Método que se ejecuta al presionar "Sí, Eliminar" en tu HTML
  bajaAlumno(): void {
    const matNumerica = Number(this.regAlumno.matricula || this.matricula);

    // Utiliza el nombre exacto del método definido en tu proyectoapi.ts (EliminaAlumno)
    this.alumnosUtl.EliminaAlumno(matNumerica).subscribe({
      next: () => {
        alert('Alumno eliminado correctamente');
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al eliminar el alumno:', error);
        alert('Ocurrió un error al intentar eliminar el alumno');
      }
    });
  }
}