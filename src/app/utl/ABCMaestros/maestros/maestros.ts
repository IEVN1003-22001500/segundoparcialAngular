
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { MaestrosFilterPipe } from '../maestros-filter.pipe';
import { Maestrosutl } from '../maestrosUTL';
import { MaestrosapiService } from '../maestrosapi.service';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MaestrosFilterPipe,
    CommonModule
  ],
  selector: 'app-maestros',
  templateUrl: './maestros.html',
})

export class Maestros implements OnInit {

  listFilter: string = '';

  maestroTitle!: string;

  dataSource: Maestrosutl[] = [];

  constructor(
    public maestrosUtl: MaestrosapiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMaestros();
  }

  cargarMaestros(): void {

    this.maestrosUtl.getMaestros().subscribe({

      next: (response: any) => {

        console.log('Datos recibidos del API:', response);

        if (Array.isArray(response)) {
          this.dataSource = response;
        } else if (response && Array.isArray(response.maestros)) {
          this.dataSource = response.maestros;
        } else {
          this.dataSource = [];
        }

        console.log('Maestros guardados en dataSource:', this.dataSource);

        this.cdr.detectChanges();

      },

      error: (error) => {
        console.error('Error al consultar API:', error);
      },

      complete: () => {
        console.log('Carga de maestros finalizada');
      }

    });

  }

}
