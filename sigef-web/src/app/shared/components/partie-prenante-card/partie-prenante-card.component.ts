import { Component, Input } from '@angular/core';
import { PartiePrenante } from '../../../data/modules/gestion-dossiers/models/PartiePrenante';
import { CategoriesPartiePrenante } from '../../../data/enums/CategoriesPartiePrenante';

@Component({
  selector: 'app-partie-prenante-card',
  templateUrl: './partie-prenante-card.component.html',
  styleUrl: './partie-prenante-card.component.scss'
})
export class PartiePrenanteCardComponent {

  @Input() partiePrenante!: PartiePrenante

  readonly categoriesPartiePrenante = CategoriesPartiePrenante

}
