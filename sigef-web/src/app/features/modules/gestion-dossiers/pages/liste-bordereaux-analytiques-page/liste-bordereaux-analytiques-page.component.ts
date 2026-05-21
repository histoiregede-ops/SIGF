import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { BordereauAnalytique } from '../../../../../data/modules/gestion-dossiers/models/BordereauAnalytique';
import { BordereauAnalytiqueService } from '../../../../../data/modules/gestion-dossiers/services/bordereau-analytique.service';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { FiltresDonneesUtils, CustomMapType } from '../../../../../data/utils/FiltresDonneesUtils';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-bordereaux-analytiques-page',
  templateUrl: './liste-bordereaux-analytiques-page.component.html',
  styleUrl: './liste-bordereaux-analytiques-page.component.scss'
})
export class ListeBordereauxAnalytiquesPageComponent implements OnInit {

  listeBordereaux: PagingData<BordereauAnalytique> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  masquerfiltres: boolean = true
  filtresForm: FormGroup = new FormGroup({
    numero: new FormControl(null, []),
  })

  constructor(
    private bordereauService: BordereauAnalytiqueService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) { }

  ngOnInit(): void {
    this.getBordereaux()
  }

  getBordereaux(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresForm.value)

    this.bordereauService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<BordereauAnalytique>) => {
          this.listeBordereaux = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste' })
        }
      })
  }

  filtrer(): void {
    this.getBordereaux({ page: 0, paginationSize: this.listeBordereaux.paginationSize! })
  }

  effacer(): void {
    this.filtresForm.reset()
    this.filtrer()
  }

  onPaginationChange(event: PaginationEventData): void {
    this.getBordereaux(event)
  }
}
