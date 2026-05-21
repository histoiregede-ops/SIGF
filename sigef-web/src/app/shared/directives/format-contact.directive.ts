import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFormatContact]'
})
export class FormatContactDirective {

  private lastValue = '';

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    let input = (event.target as HTMLInputElement);

    // Supprimer tous les espaces et caractères non numériques
    let value = input.value.replace(/\D/g, '').substring(0, 8); // Max 8 chiffres

    // Appliquer le format "xx xx xx xx"
    let formattedValue = value.replace(/(\d{2})(?=\d)/g, '$1 ');

    // Empêcher l'entrée de caractères invalides
    input.value = formattedValue.trim();
  }

}
