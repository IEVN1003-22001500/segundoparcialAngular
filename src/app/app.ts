import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Zodiaco } from './formulario/zodiaco/zodiaco';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Zodiaco],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {

  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }

}