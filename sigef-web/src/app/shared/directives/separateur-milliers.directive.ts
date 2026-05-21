import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSeparateurMilliers]',
  providers: [DecimalPipe]
})
export class SeparateurMilliersDirective {

  private lastValue = '';

  constructor(private el: ElementRef, private decimalPipe: DecimalPipe) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    let input = (event.target as HTMLInputElement);
    let value = input.value.replace(/\s/g, ''); // Supprime les espaces existants

    if (!isNaN(Number(value))) {
      this.lastValue = value;
      input.value = this.decimalPipe.transform(value, '1.0-0') || value;
    } else {
      input.value = this.decimalPipe.transform(this.lastValue, '1.0-0') || this.lastValue; // Empêche l'entrée de caractères invalides
    }
  }

}
