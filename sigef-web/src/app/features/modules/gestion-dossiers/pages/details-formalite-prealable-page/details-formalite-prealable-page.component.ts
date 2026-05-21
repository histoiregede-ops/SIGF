import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormalitePrealableService } from '../../../../../data/modules/gestion-dossiers/services/formalite-prealable.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormalitePrealable } from '../../../../../data/modules/gestion-dossiers/models/FormalitePrealable';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { StatutsFormalitePrealable } from '../../../../../data/enums/StatutsFormalitePrealable';
import { ContenanceUtils } from '../../../../../data/utils/ContenanceUtils';
import { getClassWithColor } from 'file-icons-js';
import { StatutsOpposition } from '../../../../../data/enums/StatutsOpposition';
import { TypesPartiePrenante } from '../../../../../data/enums/TypesPartiePrenante';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Opposition } from '../../../../../data/modules/gestion-dossiers/models/Opposition';
import { OppositionService } from '../../../../../data/modules/gestion-dossiers/services/opposition.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-details-formalite-prealable-page',
  templateUrl: './details-formalite-prealable-page.component.html',
  styleUrl: './details-formalite-prealable-page.component.scss'
})
export class DetailsFormalitePrealablePageComponent {

  id: string
  formalitePrealable?: FormalitePrealable
  titreFoncier?: TitreFoncier
  listeOppositions: PagingData<Opposition> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  filtresListeOppositionsForm: FormGroup = new FormGroup({
    requisition: new FormControl(null, [Validators.required]),
    numeroOrdre: new FormControl(null, []),
    statut: new FormControl(null, []),
  })

  readonly statutsFormalitePrealable = StatutsFormalitePrealable
  readonly statutsOpposition = StatutsOpposition
  readonly typesPartiePrenante = TypesPartiePrenante

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formalitePrealableService: FormalitePrealableService,
    private oppositionService: OppositionService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id") as string
    this.getFormalitePrealable()
  }

  getFormalitePrealable(): void {
    this.formalitePrealableService.get(this.id)
      .subscribe(
        {
          next: (res: FormalitePrealable) => {
            console.log(res)
            this.formalitePrealable = res

            this.filtresListeOppositionsForm.get('requisition')!.setValue(this.formalitePrealable.numeroRequisition)
            this.getOppositions()
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            if (err.status == 404) {
              this.router.navigate(['/dossiers/formalites'])
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de cette formalité préalable' })
            }
          },
        }
      )
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

  // Utils
  getSuperficieContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): number {
    return ContenanceUtils.getInstance().getSuperficieContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }

  getFichierRessourceIcone(nomFichier: string): string {
    return getClassWithColor(nomFichier)
  }
}
