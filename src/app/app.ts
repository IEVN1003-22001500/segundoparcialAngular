import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Zodiaco } from './formulario/zodiaco/zodiaco';
import { Navbar } from './navbar/navbar';
import { Distancia } from './formulario/distancia/distancia';
import { Cinepolis } from './escuela/cinepolis/cinepolis';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Zodiaco, Navbar, Distancia],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {

  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }

}