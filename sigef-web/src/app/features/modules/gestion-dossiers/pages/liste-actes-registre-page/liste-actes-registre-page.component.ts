import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { ActeRegistre } from '../../../../../data/modules/gestion-dossiers/models/ActeRegistre';
import { ActeRegistreService } from '../../../../../data/modules/gestion-dossiers/services/acte-registre.service';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { FiltresDonneesUtils, CustomMapType } from '../../../../../data/utils/FiltresDonneesUtils';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-actes-registre-page',
  templateUrl: './liste-actes-registre-page.component.html',
  styleUrl: './liste-actes-registre-page.component.scss'
})
export class ListeActesRegistrePageComponent implements OnInit {

  listeActes: PagingData<ActeRegistre> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  masquerfiltresListeActes: boolean = true
  filtresListeActesForm: FormGroup = new FormGroup({
    numeroOrdre: new FormControl(null, []),
    creatDebut: new FormControl(null, []),
    creatFin: new FormControl(null, []),
  })

  constructor(
    private acteRegistreService: ActeRegistreService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) { }

  ngOnInit(): void {
    this.getActes()
  }

  getActes(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeActesForm.value)

    this.acteRegistreService.getAll(event.page, event.paginationSize, undefined, filtres)
      .subscribe({
        next: (value: PagingData<ActeRegistre>) => {
          this.listeActes = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des actes' })
        }
      })
  }

  filtrerListeActes(): void {
    this.getActes({ page: 0, paginationSize: this.listeActes.paginationSize! })
  }

  effacerFiltresListeActes(): void {
    this.filtresListeActesForm.reset()
    this.filtrerListeActes()
  }

  onPaginationChange(event: PaginationEventData): void {
    this.getActes(event)
  }
}
