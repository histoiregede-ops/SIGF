import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotificationsHandlerService } from '../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../data/interfaces/NotificationAlert';
import { TitreFoncier } from '../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { TitreFoncierService } from '../../../data/modules/gestion-dossiers/services/titre-foncier.service';

@Component({
  selector: 'app-card-numero-titre-foncier-details',
  templateUrl: './card-numero-titre-foncier-details.component.html',
  styleUrl: './card-numero-titre-foncier-details.component.scss'
})
export class CardNumeroTitreFoncierDetailsComponent {

  @Input() numeroTitreFoncier?: string

  constructor(
    private router: Router,
    private titreFoncierService: TitreFoncierService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) { }

  getTitreFoncier(): void {
    if (this.numeroTitreFoncier) {
      this.titreFoncierService.getParNumeroTitreFoncier(this.numeroTitreFoncier)
        .subscribe({
          next: (value: TitreFoncier) => {
            console.log(value)

            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/dossiers/titres-fonciers', value.id])
            });
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            if(err.status == HttpStatusCode.NotFound) {
              Swal.fire({
                title: '<h5 class="modal-title">Titre foncier non trouvé</h5>',
                html: '<div>Aucun titre foncier n\'est pas associé à ce numéro</div>',
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
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération du titre foncier' })
            }
          }
        })
    }
    else {
      Swal.fire({
        title: '<h5 class="modal-title">Numéro non renseigné</h5>',
        html: '<div>Le numéro de titre foncier n\'est pas disponible</div>',
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
