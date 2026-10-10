
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';

// Interfaz para registrar las ventas
export interface Venta {
  nombre: string;
  compradores: number;
  tarjeta: boolean;
  boletos: number;
  subtotal: number;
  descuentoBoletos: number;
  descuentoTarjeta: number;
  total: number;
}

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-cinepolis',
  styleUrl: './cinepolis.css',
  templateUrl: './cinepolis.html',
})
export class Cinepolis implements OnInit {

  nombre: string = '';
  compradores: number = 1;
  tarjeta: boolean = false;
  boletos: number = 1;

  precioBoleto: number = 12;

  subtotal: number = 0;
  descuentoBoletos: number = 0;
  descuentoTarjeta: number = 0;
  total: number = 0;

  error: string = '';
  procesado: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      initFlowbite();
    });
  }

  procesar(): void {

    this.error = '';
    this.procesado = false;

    // Validar el nombre
    if (this.nombre.trim() === '') {
      this.error = 'Ingresa el nombre del comprador.';
      return;
    }

    // Validar compradores y boletos
    if (
      !Number.isInteger(Number(this.compradores)) ||
      this.compradores < 1 ||
      !Number.isInteger(Number(this.boletos)) ||
      this.boletos < 1
    ) {
      this.error =
        'La cantidad de compradores y boletos debe ser un número entero mayor que cero.';
      return;
    }

    // Validar máximo de boletos
    const maximoBoletos = this.compradores * 7;

    if (this.boletos > maximoBoletos) {
      this.error =
        'No puedes comprar más de 7 boletos por persona. ' +
        'El máximo permitido para este grupo es ' +
        maximoBoletos + ' boletos.';
      return;
    }

    // Calcular subtotal
    this.subtotal = this.boletos * this.precioBoleto;

    // Calcular descuento por boletos
    if (this.boletos > 5) {
      this.descuentoBoletos = this.subtotal * 0.15;
    } else if (this.boletos >= 3) {
      this.descuentoBoletos = this.subtotal * 0.10;
    } else {
      this.descuentoBoletos = 0;
    }

    // Calcular importe con descuento
    const importeConDescuento =
      this.subtotal - this.descuentoBoletos;

    // Calcular descuento de tarjeta Cinéco
    if (this.tarjeta === true) {
      this.descuentoTarjeta =
        importeConDescuento * 0.10;
    } else {
      this.descuentoTarjeta = 0;
    }

    // Calcular total
    this.total =
      importeConDescuento - this.descuentoTarjeta;

    // Crear el registro de la venta
    const nuevaVenta: Venta = {
      nombre: this.nombre.trim(),
      compradores: Number(this.compradores),
      tarjeta: this.tarjeta,
      boletos: Number(this.boletos),
      subtotal: this.subtotal,
      descuentoBoletos: this.descuentoBoletos,
      descuentoTarjeta: this.descuentoTarjeta,
      total: this.total
    };

    // Recuperar las ventas guardadas
    const datos = localStorage.getItem('ventas');

    const ventas: Venta[] = datos
      ? JSON.parse(datos)
      : [];

    // Agregar la venta nueva
    ventas.push(nuevaVenta);

    // Guardar todas las ventas
    localStorage.setItem(
      'ventas',
      JSON.stringify(ventas)
    );

    // Mostrar resultados
    this.procesado = true;
  }

  limpiar(): void {

    this.nombre = '';
    this.compradores = 1;
    this.tarjeta = false;
    this.boletos = 1;

    this.subtotal = 0;
    this.descuentoBoletos = 0;
    this.descuentoTarjeta = 0;
    this.total = 0;

    this.error = '';
    this.procesado = false;
  }

}
