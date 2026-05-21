import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { StatutsOpposition } from '../../../../../data/enums/StatutsOpposition';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { Opposition } from '../../../../../data/modules/gestion-dossiers/models/Opposition';
import { OppositionService } from '../../../../../data/modules/gestion-dossiers/services/opposition.service';
import { getClassWithColor } from 'file-icons-js';
import { TypesPartiePrenante } from '../../../../../data/enums/TypesPartiePrenante';

@Component({
  selector: 'app-details-opposition-page',
  templateUrl: './details-opposition-page.component.html',
  styleUrl: './details-opposition-page.component.scss'
})
export class DetailsOppositionPageComponent {

  id: string
  opposition?: Opposition

  readonly statutsOpposition = StatutsOpposition
  readonly typesPartiePrenante = TypesPartiePrenante

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private oppositionService: OppositionService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id") as string
    this.getOpposition()
  }

  getOpposition(): void {
    this.oppositionService.get(this.id)
      .subscribe(
        {
          next: (res: Opposition) => {
            console.log(res)
            this.opposition = res
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            if (err.status == 404) {
              this.router.navigate(['/dossiers/oppositions'])
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de cette opposition' })
            }
          },
        }
      )
  }

  // Utils
  getFichierRessourceIcone(nomFichier: string): string {
    return getClassWithColor(nomFichier)
  }
}
