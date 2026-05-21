import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { OppositionService } from '../../../../../data/modules/gestion-dossiers/services/opposition.service';
import { Opposition } from '../../../../../data/modules/gestion-dossiers/models/Opposition';
import { HttpErrorResponse } from '@angular/common/http';
import { TypesPartiePrenante } from '../../../../../data/enums/TypesPartiePrenante';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { StatutsOpposition } from '../../../../../data/enums/StatutsOpposition';
import { CategoriesPartiePrenante } from '../../../../../data/enums/CategoriesPartiePrenante';
import { FiltresDonneesUtils, CustomMapType } from '../../../../../data/utils/FiltresDonneesUtils';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-oppositions-page',
  templateUrl: './liste-oppositions-page.component.html',
  styleUrl: './liste-oppositions-page.component.scss'
})
export class ListeOppositionsPageComponent {

  listeOppositions: PagingData<Opposition> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  masquerfiltresListeOppositions: boolean = true
  filtresListeOppositionsForm: FormGroup = new FormGroup({
    requisition: new FormControl(null, []),
    creatDebut: new FormControl(null, []),
    creatFin: new FormControl(null, []),
    requerant: new FormControl(null, []),
    intervenant: new FormControl(null, []),
  })

  readonly typesPartiePrenante = TypesPartiePrenante
  readonly categoriesPartiePrenante = CategoriesPartiePrenante
  readonly statutsOpposition = StatutsOpposition

  constructor(
    private oppositionService: OppositionService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) { }

  ngOnInit(): void {
    this.getOppositions()
  }

  getOppositions(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeOppositionsForm.value)

    this.oppositionService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Opposition>) => {
          console.log(value)
          this.listeOppositions = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des oppositions' })
        }
      })
  }

  filtrerListeOppositions(): void {
    // console.log(this.filtresListeOppositionsForm.value)
    this.getOppositions({ page: this.listeOppositions.currentPage, paginationSize: this.listeOppositions.paginationSize! })
  }

  effacerFiltresListeOppositions(): void {
    this.filtresListeOppositionsForm.reset()

    this.filtrerListeOppositions()
  }

}
