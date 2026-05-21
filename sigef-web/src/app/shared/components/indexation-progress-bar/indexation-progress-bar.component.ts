import { Component, Input } from '@angular/core';
import { TacheIndexation } from '../../../data/modules/indexation/models/TacheIndexation';
import { ProgressionTacheIndexation } from '../../../data/modules/indexation/models/ProgressionTacheIndexation';
import { EtatsProgressionIndexation } from '../../../data/enums/EtatsProgressionIndexation';

@Component({
  selector: 'app-indexation-progress-bar',
  templateUrl: './indexation-progress-bar.component.html',
  styleUrl: './indexation-progress-bar.component.scss'
})
export class IndexationProgressBarComponent {
  @Input() tacheIndexation!: TacheIndexation
  @Input() nombrePages!: number

  getProgressionsTacheIndexationPourcentage(progressionsTacheIndexation: ProgressionTacheIndexation[]): number {
    const progressionsTacheIndexationIndexees: ProgressionTacheIndexation[] = progressionsTacheIndexation//.filter(value => value.etat == EtatsProgressionIndexation.INDEXE)

    return this.nombrePages ? (progressionsTacheIndexationIndexees.length * 100 / this.nombrePages) : 0
  }
}
