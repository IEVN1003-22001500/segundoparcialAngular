import { Pipe, PipeTransform } from '@angular/core';
import { Maestrosutl } from './maestrosUTL';

@Pipe({
  name: 'maestroFilter',
  standalone: true,
})

export class MaestrosFilterPipe implements PipeTransform {

  transform(value: Maestrosutl[], args: string): Maestrosutl[] {

    let filter: string = args ? args.toLocaleLowerCase() : '';

    return filter ? value.filter((maestro: Maestrosutl) =>
      maestro.nombre.toLocaleLowerCase().indexOf(filter) !== -1
    ) : value;

  }

}