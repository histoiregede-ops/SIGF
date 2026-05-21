import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getClassWithColor } from 'file-icons-js';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { StatutsDepot } from '../../../../../data/enums/StatutsDepot';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { Depot } from '../../../../../data/modules/gestion-dossiers/models/Depot';
import { DepotService } from '../../../../../data/modules/gestion-dossiers/services/depot.service';
import { TypesPartiePrenante } from '../../../../../data/enums/TypesPartiePrenante';

@Component({
  selector: 'app-details-depot-page',
  templateUrl: './details-depot-page.component.html',
  styleUrl: './details-depot-page.component.scss'
})
export class DetailsDepotPageComponent {

  id: string
  depot?: Depot

  readonly statutsDepot = StatutsDepot
  readonly typesPartiePrenante = TypesPartiePrenante

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private depotService: DepotService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id") as string
    this.getDepot()
  }

  getDepot(): void {
    this.depotService.get(this.id)
      .subscribe(
        {
          next: (res: Depot) => {
            console.log(res)
            this.depot = res
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            if (err.status == 404) {
              this.router.navigate(['/dossiers/depots'])
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de cette depot' })
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
