import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MaestrosapiService } from '../maestrosapi.service';
import { Maestrosutl } from '../maestrosUTL';

@Component({
  selector: 'app-eliminar-maestro',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './eliminar.html',
})
export class Eliminar implements OnInit {
  idmaestro: string = '';
  regMaestro: Maestrosutl = {
    idmaestro: 0, // <--- Cambiado a 0 para que coincida con el tipo number de la interfaz
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private route: ActivatedRoute,
    private maestrosService: MaestrosapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idmaestro = this.route.snapshot.paramMap.get('id') || '';

    if (this.idmaestro) {
      this.maestrosService.getMaestro(this.idmaestro).subscribe({
        next: (response: any) => {
          const datos = response.maestro || response;
          if (datos) {
            this.regMaestro = datos;
          }
        },
        error: (error) => {
          console.error('Error al consultar el maestro:', error);
          alert('No se pudo cargar la información del maestro');
        }
      });
    }
  }

  bajaMaestro(): void {
    this.maestrosService.eliminarMaestro(this.idmaestro).subscribe({
      next: () => {
        alert('Maestro eliminado correctamente');
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        alert('Ocurrió un error al intentar eliminar el maestro');
      }
    });
  }
}