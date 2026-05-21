import { Component, Input } from '@angular/core';
import { Fichier } from '../../../data/modules/indexation/models/Fichier';
import { EtatsProgressionIndexation } from '../../../data/enums/EtatsProgressionIndexation';
import { ProgressionTacheIndexation } from '../../../data/modules/indexation/models/ProgressionTacheIndexation';
import { TacheIndexationUtils } from '../../../data/utils/TacheIndexationUtils';
import { getClassWithColor } from 'file-icons-js';
import { TacheIndexation } from '../../../data/modules/indexation/models/TacheIndexation';

@Component({
  selector: 'app-indexation-page-signalees-rejetees',
  templateUrl: './indexation-page-signalees-rejetees.component.html',
  styleUrl: './indexation-page-signalees-rejetees.component.scss'
})
export class IndexationPageSignaleesRejeteesComponent {

  @Input() selectedFichier!: Fichier
  @Input() showUtilisateurs: boolean = true

  readonly etatsProgressionIndexation = EtatsProgressionIndexation

  getPagesSignaleesOuRejetees(progressionsTacheIndexation: ProgressionTacheIndexation[]): ProgressionTacheIndexation[] {
    // console.log("Pages signalées: ", progressionsTacheIndexation)
    return TacheIndexationUtils.getInstance().getPagesSignaleesOuRejetees(progressionsTacheIndexation)
  }

  getFichierRessourceIcone(nomFichier: string): string {
    return getClassWithColor(nomFichier)
  }

  exporter(tacheIndexation: TacheIndexation): void {

  }

}
