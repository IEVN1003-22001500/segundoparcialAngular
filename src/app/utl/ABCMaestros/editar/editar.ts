import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaestrosapiService } from '../maestrosapi.service';
import { Maestrosutl } from '../maestrosUTL';

@Component({
  selector: 'app-editar-maestro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './editar.html',
})
export class Editar implements OnInit {
  formulario!: FormGroup;
  idmaestro: string = '';

  constructor(
    private route: ActivatedRoute,
    private maestrosService: MaestrosapiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      idmaestro: [{ value: '', disabled: true }],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });

    this.idmaestro = this.route.snapshot.paramMap.get('id') || '';

    if (this.idmaestro) {
      this.maestrosService.getMaestro(this.idmaestro).subscribe({
        next: (response: any) => {
          const maestroData = response.maestro || response;
          if (maestroData) {
            this.formulario.patchValue(maestroData);
          }
        },
        error: (error) => {
          console.error('Error al consultar el maestro:', error);
          alert('No se pudo cargar la información del maestro');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.formulario.invalid) return;

    const maestro: Maestrosutl = this.formulario.getRawValue();

    this.maestrosService.modificarMaestro(this.idmaestro, maestro).subscribe({
      next: () => {
        alert('Maestro actualizado correctamente');
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        alert(error.error?.mensaje || 'Error al actualizar el maestro');
      }
    });
  }
}