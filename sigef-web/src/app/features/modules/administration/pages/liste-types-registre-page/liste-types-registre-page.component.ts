import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { TypeRegistre } from '../../../../../data/modules/commun/models/TypeRegistre';
import { TypeRegistreService } from '../../../../../data/modules/commun/services/type-registre.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-types-registre-page',
  templateUrl: './liste-types-registre-page.component.html',
  styleUrl: './liste-types-registre-page.component.scss'
})
export class ListeTypesRegistrePageComponent {

  listeTypesRegistre: PagingData<TypeRegistre> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListeTypesRegistre: boolean = false
  filtresListeTypesRegistreForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private typeRegistreService: TypeRegistreService,
  ) {
    this.getTypesRegistre()
  }

  getTypesRegistre(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeTypesRegistreForm.value)

    this.typeRegistreService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<TypeRegistre>) => {
          console.log(value)
          this.listeTypesRegistre = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des types de registre' })
        }
      })
  }

  annulerRechercheTypeRegistre(): void {
    this.filtresListeTypesRegistreForm.get('search')!.setValue(null)
    this.filtrerListeTypesRegistre()
  }

  filtrerListeTypesRegistre(page?: number, paginationSize?: number): void {
    this.getTypesRegistre({ page: this.listeTypesRegistre.currentPage, paginationSize: this.listeTypesRegistre.paginationSize! })
  }

  effacerFiltresListeTypesRegistre(): void {
    this.filtresListeTypesRegistreForm.reset()

    this.filtrerListeTypesRegistre()
  }

}
