
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { Venta } from '../cinepolis/cinepolis';

@Component({
  standalone: true,
  selector: 'app-ventas',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css'
})
export class Ventas implements OnInit {

  ventas: Venta[] = [];

  totalVentas: number = 0;
  totalBoletos: number = 0;

  formulario!: FormGroup;
  indiceEdicion: number = -1;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      compradores: new FormControl(1),
      tarjeta: new FormControl(false),
      boletos: new FormControl(1),
      subtotal: new FormControl(0),
      descuentoBoletos: new FormControl(0),
      descuentoTarjeta: new FormControl(0),
      total: new FormControl(0)
    });

    this.cargarVentas();
  }

  cargarVentas(): void {
    const datos = localStorage.getItem('ventas');

    this.ventas = datos ? JSON.parse(datos) : [];

    this.actualizarTotales();
  }

  actualizarTotales(): void {
    this.totalVentas = this.ventas.reduce(
      (acumulado, venta) => acumulado + Number(venta.total || 0),
      0
    );

    this.totalBoletos = this.ventas.reduce(
      (acumulado, venta) => acumulado + Number(venta.boletos || 0),
      0
    );
  }

  editarVenta(index: number): void {
    const venta = this.ventas[index];

    if (!venta) {
      return;
    }

    this.indiceEdicion = index;

    this.formulario.patchValue({
      nombre: venta.nombre,
      compradores: venta.compradores,
      tarjeta: venta.tarjeta,
      boletos: venta.boletos,
      subtotal: venta.subtotal,
      descuentoBoletos: venta.descuentoBoletos,
      descuentoTarjeta: venta.descuentoTarjeta,
      total: venta.total
    });
  }

  guardarEdicion(): void {
    if (this.indiceEdicion === -1) {
      return;
    }

    const datos = this.formulario.getRawValue();

    if (
      !datos.nombre ||
      datos.nombre.trim() === '' ||
      Number(datos.compradores) < 1 ||
      Number(datos.boletos) < 1
    ) {
      alert('Verifica el nombre, los compradores y los boletos.');
      return;
    }

    const ventaOriginal = this.ventas[this.indiceEdicion];

    if (!ventaOriginal) {
      this.limpiarCampos();
      return;
    }

    
    const ventaActualizada: Venta = {
      ...ventaOriginal,
      nombre: datos.nombre.trim(),
      compradores: Number(datos.compradores),
      tarjeta: Boolean(datos.tarjeta),
      boletos: Number(datos.boletos)
    };

    this.ventas[this.indiceEdicion] = ventaActualizada;

    localStorage.setItem('ventas', JSON.stringify(this.ventas));

    this.cargarVentas();
    this.limpiarCampos();

    alert('Venta actualizada correctamente.');
  }

  eliminarVenta(indice: number): void {
    if (confirm('¿Estás seguro de eliminar esta venta?')) {
      this.ventas.splice(indice, 1);

      localStorage.setItem('ventas', JSON.stringify(this.ventas));

      this.cargarVentas();

      if (this.indiceEdicion === indice) {
        this.limpiarCampos();
      } else if (this.indiceEdicion > indice) {
        this.indiceEdicion--;
      }
    }
  }

  limpiarCampos(): void {
    this.formulario.reset({
      nombre: '',
      compradores: 1,
      tarjeta: false,
      boletos: 1,
      subtotal: 0,
      descuentoBoletos: 0,
      descuentoTarjeta: 0,
      total: 0
    });

    this.indiceEdicion = -1;
  }

  limpiarVentas(): void {
    if (confirm('¿Estás seguro de borrar todas las ventas?')) {
      localStorage.removeItem('ventas');

      this.ventas = [];
      this.totalVentas = 0;
      this.totalBoletos = 0;

      this.limpiarCampos();
    }
  }
}
