import { Component, Input, SimpleChanges } from '@angular/core';
import { DonneeIndexation } from '../../../../../data/modules/indexation/models/DonneeIndexation';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { DonneeIndexationService } from '../../../../../data/modules/indexation/services/donnee-indexation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';

@Component({
  selector: 'app-indexation-details',
  templateUrl: './indexation-details.component.html',
  styleUrl: './indexation-details.component.scss'
})
export class IndexationDetailsComponent {

  @Input() donneeIndexationId?: DonneeIndexation['id']
  donneeIndexation?: DonneeIndexation

  constructor(
    private notificationsHandlerService: NotificationsHandlerService,
    private donneeIndexationService: DonneeIndexationService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['donneeIndexationId'].previousValue != changes['donneeIndexationId'].currentValue) {
      if (this.donneeIndexationId) {
        console.log("donneeIndexation détails")

        this.getDonneeIndexation(this.donneeIndexationId)
      }
    }
  }

  getDonneeIndexation(id: string): void {
    this.donneeIndexationService.get(id)
      .subscribe({
        next: (value: DonneeIndexation) => {
          this.donneeIndexation = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la donnée d\'indexation' })
        }
      })
  }
}
