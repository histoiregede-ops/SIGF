import { Component, Input } from '@angular/core';
import { PieceDeposee } from '../../../data/modules/gestion-dossiers/models/PieceDeposee';
import { getClassWithColor } from 'file-icons-js';

@Component({
  selector: 'app-piece-deposee-card',
  templateUrl: './piece-deposee-card.component.html',
  styleUrl: './piece-deposee-card.component.scss'
})
export class PieceDeposeeCardComponent {

  @Input() pieceDeposee!: PieceDeposee

  // Utils
  getFichierRessourceIcone(nomFichier: string): string {
    return getClassWithColor(nomFichier)
  }
}
