import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaestrosapiService } from '../maestrosapi.service';
import { Maestrosutl } from '../maestrosUTL';

@Component({
  selector: 'app-maestros',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './maestros.html',
})
export class Maestros implements OnInit {
  dataSource: Maestrosutl[] = [];
  listFilter: string = '';

  constructor(
    private maestrosService: MaestrosapiService,
    private cdr: ChangeDetectorRef // Agregado para refrescar vista de forma inmediata
  ) {}

  ngOnInit(): void {
    this.cargarMaestros();
  }

  cargarMaestros(): void {
    this.maestrosService.getMaestros().subscribe({
      next: (response: any) => {
        if (response && response.maestros) {
          this.dataSource = response.maestros;
        } else if (Array.isArray(response)) {
          this.dataSource = response;
        } else {
          this.dataSource = [];
        }
        
        // Fuerza a Angular a repintar la tabla al instante al recargar la página
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar la lista de maestros:', error);
      }
    });
  }

  // Getter que filtra automáticamente respetando el funcionamiento original
  get maestrosFiltrados(): Maestrosutl[] {
    if (!this.listFilter || this.listFilter.trim() === '') {
      return this.dataSource;
    }
    const textoFiltro = this.listFilter.toLowerCase();
    return this.dataSource.filter(maestro => 
      maestro.nombre.toLowerCase().includes(textoFiltro) ||
      maestro.apaterno.toLowerCase().includes(textoFiltro) ||
      maestro.amaterno.toLowerCase().includes(textoFiltro) ||
      maestro.correo.toLowerCase().includes(textoFiltro)
    );
  }
}