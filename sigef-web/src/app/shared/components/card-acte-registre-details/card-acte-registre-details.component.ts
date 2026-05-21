import { Component, Input } from '@angular/core';
import { ActeRegistre } from '../../../data/modules/gestion-dossiers/models/ActeRegistre';

@Component({
  selector: 'app-card-acte-registre-details',
  templateUrl: './card-acte-registre-details.component.html',
  styleUrl: './card-acte-registre-details.component.scss'
})
export class CardActeRegistreDetailsComponent {
  @Input() acteRegistre!: ActeRegistre
}
