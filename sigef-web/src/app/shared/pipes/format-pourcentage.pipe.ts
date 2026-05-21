import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPourcentage'
})
export class FormatPourcentagePipe implements PipeTransform {

  transform(valeur: number): string {
    const pourcentage: string = valeur.toFixed(2)
    const result: string = pourcentage.endsWith('.00') ? pourcentage.slice(0, -3) : pourcentage

    return result + '%'
  }

}
