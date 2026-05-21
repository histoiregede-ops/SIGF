import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { TypeLienGroupe } from '../../../../../data/modules/commun/models/TypeLienGroupe';
import { TypeLienGroupeService } from '../../../../../data/modules/commun/services/type-lien-groupe.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-liens-groupe-page',
  templateUrl: './liste-liens-groupe-page.component.html',
  styleUrl: './liste-liens-groupe-page.component.scss'
})
export class ListeLiensGroupePageComponent {

  showNouveauLienGroupeModal: boolean = false
  showModificationLienGroupeModal: boolean = false
  showSuppressionLienGroupeModal: boolean = false

  listeLiensGroupe: PagingData<TypeLienGroupe> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListeLiensGroupe: boolean = false
  filtresListeLiensGroupeForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
  })

  nouveauLienGroupeForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationLienGroupeForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionLienGroupeForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private typeLienGroupeService: TypeLienGroupeService,
  ) {
    this.getLiensGroupe()
  }

  getLiensGroupe(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeLiensGroupeForm.value)

    this.typeLienGroupeService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<TypeLienGroupe>) => {
          console.log(value)
          this.listeLiensGroupe = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des liens de groupe' })
        }
      })
  }

  annulerRechercheLienGroupe(): void {
    this.filtresListeLiensGroupeForm.get('search')!.setValue(null)
    this.filtrerListeLiensGroupe()
  }

  filtrerListeLiensGroupe(page?: number, paginationSize?: number): void {
    this.getLiensGroupe({ page: this.listeLiensGroupe.currentPage, paginationSize: this.listeLiensGroupe.paginationSize! })
  }

  effacerFiltresListeLiensGroupe(): void {
    this.filtresListeLiensGroupeForm.reset()

    this.filtrerListeLiensGroupe()
  }

  validerCreationLienGroupe(): void {
    this.nouveauLienGroupeForm.markAllAsTouched()
    // console.log(this.nouveauLienGroupeForm.value)
    if (this.nouveauLienGroupeForm.valid) {
      let lienGroupe: TypeLienGroupe = this.nouveauLienGroupeForm.value

      this.typeLienGroupeService.create(lienGroupe)
        .subscribe({
          next: (value: TypeLienGroupe) => {
            this.getLiensGroupe()
            this.closeNouveauLienGroupeModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce lien de groupe a été créé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une lien de groupe avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création du lien de groupe' })
            }
          },
        })
    }
  }

  annulerCreationLienGroupe(): void {
    this.closeNouveauLienGroupeModal()
  }

  validerModificationLienGroupe(): void {
    console.log(this.modificationLienGroupeForm.value)
    this.modificationLienGroupeForm.markAllAsTouched()

    if (this.modificationLienGroupeForm.valid) {
      let lienGroupe: TypeLienGroupe = this.modificationLienGroupeForm.value

      this.typeLienGroupeService.update(lienGroupe)
        .subscribe({
          next: (value: TypeLienGroupe) => {
            this.getLiensGroupe()
            this.closeModificationLienGroupeModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce lien de groupe a été mis à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une lien de groupe avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du lien de groupe' })
            }
          },
        })
    }
  }

  annulerModificationLienGroupe(): void {
    this.closeModificationLienGroupeModal()
  }

  validerSuppressionLienGroupe(): void {
    console.log(this.suppressionLienGroupeForm.value)
    this.suppressionLienGroupeForm.markAllAsTouched()

    if (this.suppressionLienGroupeForm.valid) {
      let lienGroupeId: TypeLienGroupe['id'] = this.suppressionLienGroupeForm.get('id')!.value

      this.typeLienGroupeService.delete(lienGroupeId!)
        .subscribe({
          next: (value: TypeLienGroupe) => {
            this.getLiensGroupe()
            this.closeSuppressionLienGroupeModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce lien de groupe a été supprimé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression du lien de groupe' })
          },
        })
    }
  }

  annulerSuppressionLienGroupe(): void {
    this.closeSuppressionLienGroupeModal()
  }

  // Modals
  openNouveauLienGroupeModal(): void {
    this.showNouveauLienGroupeModal = true
  }

  closeNouveauLienGroupeModal(): void {
    this.showNouveauLienGroupeModal = false
    this.nouveauLienGroupeForm.reset()
  }

  openModificationLienGroupeModal(index: number): void {
    const selectedLienGroupe: TypeLienGroupe | undefined = this.listeLiensGroupe.data[index]

    if (selectedLienGroupe != undefined) {
      this.modificationLienGroupeForm.get('id')?.setValue(selectedLienGroupe.id)
      this.modificationLienGroupeForm.get('libelle')?.setValue(selectedLienGroupe.libelle)
      this.modificationLienGroupeForm.get('description')?.setValue(selectedLienGroupe.description)

      this.showModificationLienGroupeModal = true
    }
  }

  closeModificationLienGroupeModal(): void {
    this.showModificationLienGroupeModal = false
    this.modificationLienGroupeForm.reset()
  }

  openSuppressionLienGroupeModal(index: number): void {
    const selectedLienGroupe: TypeLienGroupe | undefined = this.listeLiensGroupe.data[index]

    if (selectedLienGroupe != undefined) {
      this.suppressionLienGroupeForm.get('id')?.setValue(selectedLienGroupe.id)

      this.showSuppressionLienGroupeModal = true
    }
  }

  closeSuppressionLienGroupeModal(): void {
    this.showSuppressionLienGroupeModal = false
    this.suppressionLienGroupeForm.reset()
  }

}
