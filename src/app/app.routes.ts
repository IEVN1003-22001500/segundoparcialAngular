import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'formulario',
    children: [
      {
        path: 'distancia',
        loadComponent: () =>
          import('./formulario/distancia/distancia')
            .then(c => c.Distancia)
      },
      {
        path: 'zodiaco',
        loadComponent: () =>
          import('./formulario/zodiaco/zodiaco')
            .then(c => c.Zodiaco)
      }
    ]
  },

  {
    path: 'escuela/cinepolis',
    loadComponent: () =>
      import('./escuela/cinepolis/cinepolis')
        .then(c => c.Cinepolis)
  },

  {
    path: 'escuela/lista-escuela',
    loadComponent: () =>
      import('./escuela/lista-escuela/lista-escuela')
        .then(c => c.ListaEscuela)
  },

  {
    path: 'escuela/ventas',
    loadComponent: () =>
      import('./escuela/ventas/ventas')
        .then(c => c.Ventas)
  },

  // RUTAS UTL
  {
    path: 'utl',
    children: [

      // ALUMNOS
      {
        path: 'alumnos',
        loadComponent: () =>
          import('./utl/ABCAlumnos/alumnos/alumnos')
            .then(c => c.Alumnos)
      },

      // MAESTROS
      {
        path: 'maestros',
        loadComponent: () =>
          import('./utl/ABCMaestros/maestros/maestros')
            .then(c => c.Maestros)
      }

    ]
  },

  {
    path: '',
    redirectTo: 'formulario/distancia',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'formulario/distancia'
  }

];