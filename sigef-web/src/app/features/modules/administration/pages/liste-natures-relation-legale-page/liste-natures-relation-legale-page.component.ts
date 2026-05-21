import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { TypeRelationLegale } from '../../../../../data/modules/commun/models/TypeRelationLegale';
import { TypeRelationLegaleService } from '../../../../../data/modules/commun/services/type-relation-legale.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-natures-relation-legale-page',
  templateUrl: './liste-natures-relation-legale-page.component.html',
  styleUrl: './liste-natures-relation-legale-page.component.scss'
})
export class ListeNaturesRelationLegalePageComponent {

  showNouvelleNatureRelationLegaleModal: boolean = false
  showModificationNatureRelationLegaleModal: boolean = false
  showSuppressionNatureRelationLegaleModal: boolean = false

  listeNaturesRelationLegale: PagingData<TypeRelationLegale> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListeNaturesRelationLegale: boolean = false
  filtresListeNaturesRelationLegaleForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
  })

  nouvelleNatureRelationLegaleForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationNatureRelationLegaleForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionNatureRelationLegaleForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private typeRelationLegaleService: TypeRelationLegaleService,
  ) {
    this.getNaturesRelationLegale()
  }

  getNaturesRelationLegale(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeNaturesRelationLegaleForm.value)

    this.typeRelationLegaleService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<TypeRelationLegale>) => {
          console.log(value)
          this.listeNaturesRelationLegale = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des natures de relation legale' })
        }
      })
  }

  annulerRechercheNatureRelationLegale(): void {
    this.filtresListeNaturesRelationLegaleForm.get('search')!.setValue(null)
    this.filtrerListeNaturesRelationLegale()
  }

  filtrerListeNaturesRelationLegale(page?: number, paginationSize?: number): void {
    this.getNaturesRelationLegale({ page: this.listeNaturesRelationLegale.currentPage, paginationSize: this.listeNaturesRelationLegale.paginationSize! })
  }

  effacerFiltresListeNaturesRelationLegale(): void {
    this.filtresListeNaturesRelationLegaleForm.reset()

    this.filtrerListeNaturesRelationLegale()
  }

  validerCreationNatureRelationLegale(): void {
    this.nouvelleNatureRelationLegaleForm.markAllAsTouched()
    // console.log(this.nouvelleNatureRelationLegaleForm.value)
    if (this.nouvelleNatureRelationLegaleForm.valid) {
      let natureRelationLegale: TypeRelationLegale = this.nouvelleNatureRelationLegaleForm.value

      this.typeRelationLegaleService.create(natureRelationLegale)
        .subscribe({
          next: (value: TypeRelationLegale) => {
            this.getNaturesRelationLegale()
            this.closeNouvelleNatureRelationLegaleModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette nature de relation legale a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une nature de relation legale avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de la nature de relation legale' })
            }
          },
        })
    }
  }

  annulerCreationNatureRelationLegale(): void {
    this.closeNouvelleNatureRelationLegaleModal()
  }

  validerModificationNatureRelationLegale(): void {
    console.log(this.modificationNatureRelationLegaleForm.value)
    this.modificationNatureRelationLegaleForm.markAllAsTouched()

    if (this.modificationNatureRelationLegaleForm.valid) {
      let natureRelationLegale: TypeRelationLegale = this.modificationNatureRelationLegaleForm.value

      this.typeRelationLegaleService.update(natureRelationLegale)
        .subscribe({
          next: (value: TypeRelationLegale) => {
            this.getNaturesRelationLegale()
            this.closeModificationNatureRelationLegaleModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette nature de relation legale a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une nature de relation legale avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la nature de relation legale' })
            }
          },
        })
    }
  }

  annulerModificationNatureRelationLegale(): void {
    this.closeModificationNatureRelationLegaleModal()
  }

  validerSuppressionNatureRelationLegale(): void {
    console.log(this.suppressionNatureRelationLegaleForm.value)
    this.suppressionNatureRelationLegaleForm.markAllAsTouched()

    if (this.suppressionNatureRelationLegaleForm.valid) {
      let natureRelationLegaleId: TypeRelationLegale['id'] = this.suppressionNatureRelationLegaleForm.get('id')!.value

      this.typeRelationLegaleService.delete(natureRelationLegaleId!)
        .subscribe({
          next: (value: TypeRelationLegale) => {
            this.getNaturesRelationLegale()
            this.closeSuppressionNatureRelationLegaleModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette nature de relation legale a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la nature de relation legale' })
          },
        })
    }
  }

  annulerSuppressionNatureRelationLegale(): void {
    this.closeSuppressionNatureRelationLegaleModal()
  }

  // Modals
  openNouvelleNatureRelationLegaleModal(): void {
    this.showNouvelleNatureRelationLegaleModal = true
  }

  closeNouvelleNatureRelationLegaleModal(): void {
    this.showNouvelleNatureRelationLegaleModal = false
    this.nouvelleNatureRelationLegaleForm.reset()
  }

  openModificationNatureRelationLegaleModal(index: number): void {
    const selectedNatureRelationLegale: TypeRelationLegale | undefined = this.listeNaturesRelationLegale.data[index]

    if (selectedNatureRelationLegale != undefined) {
      this.modificationNatureRelationLegaleForm.get('id')?.setValue(selectedNatureRelationLegale.id)
      this.modificationNatureRelationLegaleForm.get('libelle')?.setValue(selectedNatureRelationLegale.libelle)
      this.modificationNatureRelationLegaleForm.get('description')?.setValue(selectedNatureRelationLegale.description)

      this.showModificationNatureRelationLegaleModal = true
    }
  }

  closeModificationNatureRelationLegaleModal(): void {
    this.showModificationNatureRelationLegaleModal = false
    this.modificationNatureRelationLegaleForm.reset()
  }

  openSuppressionNatureRelationLegaleModal(index: number): void {
    const selectedNatureRelationLegale: TypeRelationLegale | undefined = this.listeNaturesRelationLegale.data[index]

    if (selectedNatureRelationLegale != undefined) {
      this.suppressionNatureRelationLegaleForm.get('id')?.setValue(selectedNatureRelationLegale.id)

      this.showSuppressionNatureRelationLegaleModal = true
    }
  }

  closeSuppressionNatureRelationLegaleModal(): void {
    this.showSuppressionNatureRelationLegaleModal = false
    this.suppressionNatureRelationLegaleForm.reset()
  }


}
