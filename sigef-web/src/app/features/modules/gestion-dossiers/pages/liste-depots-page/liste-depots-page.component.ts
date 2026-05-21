import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TypesPartiePrenante } from '../../../../../data/enums/TypesPartiePrenante';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Depot } from '../../../../../data/modules/gestion-dossiers/models/Depot';
import { DepotService } from '../../../../../data/modules/gestion-dossiers/services/depot.service';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { StatutsDepot } from '../../../../../data/enums/StatutsDepot';
import { CategoriesPartiePrenante } from '../../../../../data/enums/CategoriesPartiePrenante';
import { FiltresDonneesUtils, CustomMapType } from '../../../../../data/utils/FiltresDonneesUtils';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-depots-page',
  templateUrl: './liste-depots-page.component.html',
  styleUrl: './liste-depots-page.component.scss'
})
export class ListeDepotsPageComponent {

  listeDepots: PagingData<Depot> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  masquerfiltresListeDepots: boolean = true
  filtresListeDepotsForm: FormGroup = new FormGroup({
    requisition: new FormControl(null, []),
    creatDebut: new FormControl(null, []),
    creatFin: new FormControl(null, []),
    alienateur: new FormControl(null, []),
    acquereur: new FormControl(null, []),
  })

  readonly typesPartiePrenante = TypesPartiePrenante
  readonly categoriesPartiePrenante = CategoriesPartiePrenante
  readonly statutsDepot = StatutsDepot

  constructor(
    private depotService: DepotService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) { }

  ngOnInit(): void {
    this.getDepots()
  }

  getDepots(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeDepotsForm.value)

    this.depotService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Depot>) => {
          console.log(value)
          this.listeDepots = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des dépôts' })
        }
      })
  }

  filtrerListeDepots(): void {
    // console.log(this.filtresListeDepotsForm.value)
    this.getDepots({ page: this.listeDepots.currentPage, paginationSize: this.listeDepots.paginationSize! })
  }

  effacerFiltresListeDepots(): void {
    this.filtresListeDepotsForm.reset()

    this.filtrerListeDepots()
  }
}
