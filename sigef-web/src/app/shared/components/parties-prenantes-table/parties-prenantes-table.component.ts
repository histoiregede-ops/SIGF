import { Component, Input } from '@angular/core';
import { PartiePrenante } from '../../../data/modules/gestion-dossiers/models/PartiePrenante';
import { CategoriesPartiePrenante } from '../../../data/enums/CategoriesPartiePrenante';
import { TypesPartiePrenante } from '../../../data/enums/TypesPartiePrenante';

@Component({
  selector: 'app-parties-prenantes-table',
  templateUrl: './parties-prenantes-table.component.html',
  styleUrl: './parties-prenantes-table.component.scss'
})
export class PartiesPrenantesTableComponent {

  @Input() partiesPrenantes: PartiePrenante[] = []
  @Input() typePartiePrenante!: TypesPartiePrenante
  @Input() noPartiePrenanteText: string = 'Aucune partie prenante'

  readonly typesPartiePrenante = TypesPartiePrenante
  readonly categoriesPartiePrenante = CategoriesPartiePrenante
}
