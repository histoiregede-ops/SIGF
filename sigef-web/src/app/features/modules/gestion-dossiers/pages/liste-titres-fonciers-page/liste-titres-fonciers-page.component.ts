import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesPartiePrenante } from '../../../../../data/enums/TypesPartiePrenante';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { TitreFoncierService } from '../../../../../data/modules/gestion-dossiers/services/titre-foncier.service';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { StatutsTitreFoncier } from '../../../../../data/enums/StatutsTitreFoncier';
import { ProcessusCreationTitreFoncier } from '../../../../../data/enums/ProcessusCreationTitreFoncier';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-titres-fonciers-page',
  templateUrl: './liste-titres-fonciers-page.component.html',
  styleUrl: './liste-titres-fonciers-page.component.scss'
})
export class ListeTitresFonciersPageComponent  implements OnInit {

  listeTitresFonciers: PagingData<TitreFoncier> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  masquerfiltresListeTitresFonciers: boolean = true
  filtresListeTitresFonciersForm: FormGroup = new FormGroup({
    requisition: new FormControl(null, []),
    creatDebut: new FormControl(null, []),
    creatFin: new FormControl(null, []),
    requerant: new FormControl(null, []),
    proprietaire: new FormControl(null, []),
    type: new FormControl(null, []),
    etat: new FormControl(null, []),
    region: new FormControl(null, []),
    village: new FormControl(null, []),
    lieudit: new FormControl(null, []),
    rue: new FormControl(null, []),
    circon: new FormControl(null, []),
    commune: new FormControl(null, []),
  })

  readonly ProcessusCreationTitreFoncier = ProcessusCreationTitreFoncier
  readonly typesPartiePrenante = TypesPartiePrenante
  readonly statutsTitreFoncier = StatutsTitreFoncier

  constructor(
    private router: Router,
    private titreFoncierService: TitreFoncierService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) { }

  ngOnInit(): void {
    this.getTitresFonciers()
  }

  getTitresFonciers(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeTitresFonciersForm.value)

    this.titreFoncierService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<TitreFoncier>) => {
          // console.log(value)
          this.listeTitresFonciers = value
        },
        error: (err: HttpErrorResponse) => {
          this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des titres fonciers'})
        }
      })
  }

  filtrerListeTitresFonciers(): void {
    // console.log(this.filtresListeTitresFonciersForm.value)
    this.getTitresFonciers({ page: this.listeTitresFonciers.currentPage, paginationSize: this.listeTitresFonciers.paginationSize! })
  }

  effacerFiltresListeTitresFonciers(): void {
    this.filtresListeTitresFonciersForm.reset()

    this.filtrerListeTitresFonciers()
  }
}