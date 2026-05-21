import { Component } from '@angular/core';
import { TypesRegistre } from '../../../../../data/enums/TypesRegistre';
import { TypeRegistre } from '../../../../../data/modules/commun/models/TypeRegistre';
import { DemandeTransfert } from '../../../../../data/modules/gestion-dossiers/models/DemandeTransfert';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { DemandeTransfertService } from '../../../../../data/modules/gestion-dossiers/services/demande-transfert.service';
import { TypeRegistreService } from '../../../../../data/modules/commun/services/type-registre.service';
import { StatutsDemandeTransfert } from '../../../../../data/enums/StatutsDemandeTransfert';

@Component({
  selector: 'app-details-demande-transfert-page',
  templateUrl: './details-demande-transfert-page.component.html',
  styleUrl: './details-demande-transfert-page.component.scss'
})
export class DetailsDemandeTransfertPageComponent {

  typeRegistreId!: TypesRegistre
  typeRegistre?: TypeRegistre

  id: string
  demandeTransfert?: DemandeTransfert

  readonly statutsDemandeTransfert = StatutsDemandeTransfert

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private demandeTransfertService: DemandeTransfertService,
    private typeRegistreService: TypeRegistreService,
    private notificationsHandlerService: NotificationsHandlerService,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id") as string
    
    this.activatedRoute.params
      .subscribe((params) => {
        console.log("Param changing: ", params["type"])

        this.typeRegistreId = this.activatedRoute.snapshot.paramMap.get("type") as TypesRegistre
        console.log(this.typeRegistreId)

        if (!Object.values(TypesRegistre).includes(this.typeRegistreId)) {
          this.router.navigate(['/'])
        }
        else {
          this.getTypeRegistre()
          this.getDemandeTransfert()
        }
      })
  }

  getTypeRegistre(): void {
    this.typeRegistreService.get(this.typeRegistreId)
      .subscribe({
        next: (value: TypeRegistre) => {
          console.log(value)
          this.typeRegistre = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération du type de registre' })
        }
      })
  }

  getDemandeTransfert(): void {
    this.demandeTransfertService.get(this.id)
      .subscribe(
        {
          next: (res: DemandeTransfert) => {
            console.log(res)
            this.demandeTransfert = res
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            if (err.status == 404) {
              this.router.navigate(['/dossiers/transferts', this.typeRegistreId])
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de cette depot' })
            }
          },
        }
      )
  }
}
