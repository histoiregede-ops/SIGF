import { Component, Input } from '@angular/core';
import { FormalitePrealableService } from '../../../data/modules/gestion-dossiers/services/formalite-prealable.service';
import Swal from 'sweetalert2';
import { FormalitePrealable } from '../../../data/modules/gestion-dossiers/models/FormalitePrealable';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { TypesNotificationAlert } from '../../../data/interfaces/NotificationAlert';
import { NotificationsHandlerService } from '../../../core/services/notifications-handler.service';

@Component({
  selector: 'app-card-numero-requisition-details',
  templateUrl: './card-numero-requisition-details.component.html',
  styleUrl: './card-numero-requisition-details.component.scss'
})
export class CardNumeroRequisitionDetailsComponent {

  @Input() numeroRequisition?: string

  constructor(
    private router: Router,
    private formalitePrealableService: FormalitePrealableService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) { }

  getFormalitePrealable(): void {
    if (this.numeroRequisition) {
      this.formalitePrealableService.getParNumeroRequisition(this.numeroRequisition)
        .subscribe({
          next: (value: FormalitePrealable) => {
            console.log(value)

            // this.router.navigate(['/dossiers/formalites', value.id])
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/dossiers/formalites', value.id])
            });
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            if(err.status == HttpStatusCode.NotFound) {
              Swal.fire({
                title: '<h5 class="modal-title">Formalité non trouvée</h5>',
                html: '<div>Aucune formalité préalable n\'est pas associée à ce numéro de réquisition</div>',
                icon: 'error',
                showCloseButton: true,
                confirmButtonText: 'Ok',
                // confirmButtonColor: 'var(--es-primary)'
                customClass: {
                  htmlContainer: "text-muted fs-6",
                  confirmButton: "btn btn-primary"
                }
              });
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la formalité préalable' })
            }
          }
        })
    }
    else {
      Swal.fire({
        title: '<h5 class="modal-title">Numéro non renseigné</h5>',
        html: '<div>Le numéro de réquisition n\'est pas disponible</div>',
        icon: 'error',
        showCloseButton: true,
        confirmButtonText: 'Ok',
        // confirmButtonColor: 'var(--es-primary)'
        customClass: {
          htmlContainer: "text-muted fs-6",
          confirmButton: "btn btn-primary"
        }
      });
    }
  }

}
