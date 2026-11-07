import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaestrosapiService } from '../maestrosapi.service';
import { Maestrosutl } from '../maestrosUTL';

@Component({
  selector: 'app-agregar-maestro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './agregar.html'
})
export class Agregar implements OnInit {
  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private maestrosService: MaestrosapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      idmaestro: ['', Validators.required],
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    // Convertimos explícitamente idmaestro a número antes de enviarlo a la API
    const maestro: Maestrosutl = {
      ...this.formulario.value,
      idmaestro: Number(this.formulario.value.idmaestro)
    };

    this.maestrosService.agregarMaestro(maestro).subscribe({
      next: () => {
        alert('Maestro registrado correctamente');
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        alert(error.error?.mensaje || 'Error al registrar el maestro');
      }
    });
  }
}