import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getClassWithColor } from 'file-icons-js';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { StatutsTitreFoncier } from '../../../../../data/enums/StatutsTitreFoncier';
import { StatutsOpposition } from '../../../../../data/enums/StatutsOpposition';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { TitreFoncierService } from '../../../../../data/modules/gestion-dossiers/services/titre-foncier.service';
import { ContenanceUtils } from '../../../../../data/utils/ContenanceUtils';
import { ProcessusCreationTitreFoncier } from '../../../../../data/enums/ProcessusCreationTitreFoncier';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-titre-foncier-page',
  templateUrl: './details-titre-foncier-page.component.html',
  styleUrl: './details-titre-foncier-page.component.scss'
})
export class DetailsTitreFoncierPageComponent {

  id: string
  titreFoncier?: TitreFoncier

  showDetailsContenanceModal: boolean = false
  showDetailsIndexationModal: boolean = false

  readonly ProcessusCreationTitreFoncier = ProcessusCreationTitreFoncier
  readonly statutsTitreFoncier = StatutsTitreFoncier
  readonly statutsOpposition = StatutsOpposition

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titreFoncierService: TitreFoncierService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id") as string
    this.getTitreFoncier()
  }

  getTitreFoncier(): void {
    this.titreFoncierService.get(this.id)
      .subscribe(
        {
          next: (res: TitreFoncier) => {
            console.log(res)
            this.titreFoncier = res

            if (this.titreFoncier.statut == StatutsTitreFoncier.ANNULE) {
              Swal.fire({
                title: '<h5 class="modal-title text-uppercase">Titre foncier annulé</h5>',
                html: '<div>Cliquez sur OK si vous souhaitez tout de même consulter ce titre. <br>NB: Il est impossible de modifier les informations de ce titre.</div>',
                icon: 'error',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Fermer',
                customClass: {
                  htmlContainer: "text-muted fs-6",
                  confirmButton: "btn btn-primary",
                  cancelButton: "btn btn-light",
                }
              })
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            if (err.status == 404) {
              this.router.navigate(['/dossiers/titres-fonciers'])
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de ce titre foncier' })
            }
          },
        }
      )
  }

  // Utils
  getValeurContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): string {
    return ContenanceUtils.getInstance().getValeurContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }

  getSuperficieContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): number {
    return ContenanceUtils.getInstance().getSuperficieContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }

  getFichierRessourceIcone(nomFichier: string): string {
    return getClassWithColor(nomFichier)
  }

  // Modals
  openDetailsContenanceModal(): void {
    this.showDetailsContenanceModal = true
  }
  
  closeDetailsContenanceModal(): void {
    this.showDetailsContenanceModal = false
  }
  
  openDetailsIndexationModal(): void {
    this.showDetailsIndexationModal = true
  }
  
  closeDetailsIndexationModal(): void {
    this.showDetailsIndexationModal = false
  }
}
