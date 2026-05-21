import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(tailleEnOctets?: number, decimals: number = 2): string {
    if(!tailleEnOctets) {
      return '-----'
    }
    
    const units: string[] = ['o', 'Ko', 'Mo', 'Go', 'To']
    const index: number = Math.floor(Math.log(tailleEnOctets) / Math.log(1024))
    const size: number = tailleEnOctets / Math.pow(1024, index)

    return size.toFixed(decimals) + ' ' + units[index]
  }

}
