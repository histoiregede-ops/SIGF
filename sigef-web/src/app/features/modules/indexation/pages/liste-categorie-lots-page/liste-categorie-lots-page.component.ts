import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';

@Component({
  selector: 'app-liste-categorie-lots-page',
  templateUrl: './liste-categorie-lots-page.component.html',
  styleUrl: './liste-categorie-lots-page.component.scss'
})
export class ListeCategorieLotsPageComponent {
  readonly typesRegistre = TypesRegistre;

  constructor(
    private router: Router
  ) {}

  openSaisieType(type: TypesRegistre): void {
    this.router.navigate(['/indexation/taches/saisie', type]);
  }
}
