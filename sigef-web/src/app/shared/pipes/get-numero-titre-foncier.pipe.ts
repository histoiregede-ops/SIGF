import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getNumeroTitreFoncier'
})
export class GetNumeroTitreFoncierPipe implements PipeTransform {

  transform(numero?: number, numeroPrefixe?: string, numeroSuffixe?: string, ...args: unknown[]): string | null {
    console.log(numero, numeroPrefixe, numeroSuffixe)
    if(!numero)
      return null

    let numeroTitreFoncier: string[] = []

    if(numeroPrefixe) {
      numeroTitreFoncier.push(numeroPrefixe)
    }
    numeroTitreFoncier.push(numero!.toString().padStart(5, '0'))
    if(numeroSuffixe) {
      numeroTitreFoncier.push(numeroSuffixe)
    }

    return numeroTitreFoncier.join('-');
  }

}
