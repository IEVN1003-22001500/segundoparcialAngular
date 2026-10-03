import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css'
})
export class Zodiaco {

  nombre: string = '';
  dia: number = 0;
  mes: number = 0;
  anio: number = 0;
  sexo: string = '';

  edad: number = 0;
  signo: string = '';
  imagen: string = '';

  imprimir(): void {

    // Comprobar que el botón funciona
  

    // Calcular edad
    this.edad = 2026 - this.anio;
if (this.mes > 10 || (this.mes == 10 && this.dia > 2)) {
  this.edad = this.edad - 1;
}
    
    let numeroanimal = this.anio % 12;

    if (numeroanimal == 4) {
      this.signo = 'Rata';
      this.imagen = 'https://donpipo.cl/wp-content/uploads/2024/08/09-3-scaled.jpg';

    } else if (numeroanimal == 5) {
      this.signo = 'Buey';
      this.imagen = 'https://ih1.redbubble.net/image.4783582889.0697/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg';

    } else if (numeroanimal == 6) {
      this.signo = 'Tigre';
      this.imagen = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHEXRC7lYFF5KqX5LOYm7HH3fx0LT4f-NilFXLtLKpvTvF2MeV64t_vtEE&s=10';

    } else if (numeroanimal == 7) {
      this.signo = 'Conejo';
      this.imagen = 'https://thumbs.dreamstime.com/b/un-guerrero-de-conejo-en-la-armadura-de-samurai-se-pone-alto-y-listo-para-la-batalla-372146522.jpg';

    } else if (numeroanimal == 8) {
      this.signo = 'Dragón';
      this.imagen = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVJXQKPo2KRMWrkd6xegYJgAJ2fpNbnJAX14WO43SyQUzn1g0XHuz4F4g&s=10';

    } else if (numeroanimal == 9) {
      this.signo = 'Serpiente';
      this.imagen = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMVUGPUgKf0leQDF-WkqEFNh21cG3AACmhzYSkFq1dk_iHMbRjFiUlpRL6&s=10';

    } else if (numeroanimal == 10) {
      this.signo = 'Caballo';
      this.imagen = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdfWVDe6gpmVZQvyvjJpdwqGgqjLJCELme3UuXai4EWPwSG8zFWqDHv8ab&s=10';

    } else if (numeroanimal == 11) {
      this.signo = 'Cabra';
      this.imagen = 'https://thumbs.dreamstime.com/b/zodiaco-de-cabra-celeste-chino-con-presencia-m%C3%ADstica-370061824.jpg';

    } else if (numeroanimal == 0) {
      this.signo = 'Mono';
      this.imagen = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZK0EKQWk_7tBQCPf9AqNSZbPlAqP7FhALrRUg-PrUjI_n8sn1-QdJLo1W&s=10';

    } else if (numeroanimal == 1) {
      this.signo = 'Gallo';
      this.imagen = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcteiboC8o8cKr2eESsgm11igQ8X07jj8UuESvGZi4NQ&s=10';

    } else if (numeroanimal == 2) {
      this.signo = 'Perro';
      this.imagen = 'https://masterpiecer-images.s3.yandex.net/5fb5329a83cb86d:upscaled';

    } else if (numeroanimal == 3) {
      this.signo = 'Cerdo';
      this.imagen = 'https://media.craiyon.com/2025-07-27/UnlhYJKURY6MJmXKow_HNg.webp';
    }
  }
}