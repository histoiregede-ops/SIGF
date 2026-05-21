import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Canton } from '../../../../../data/modules/commun/models/Canton';
import { Village } from '../../../../../data/modules/commun/models/Village';
import { CantonService } from '../../../../../data/modules/commun/services/canton.service';
import { VillageService } from '../../../../../data/modules/commun/services/village.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-villages-page',
  templateUrl: './liste-villages-page.component.html',
  styleUrl: './liste-villages-page.component.scss'
})
export class ListeVillagesPageComponent {
  
  showNouveauVillageModal: boolean = false
  showModificationVillageModal: boolean = false
  showSuppressionVillageModal: boolean = false

  listeVillages: PagingData<Village> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  cantons: Canton[] = []

  masquerfiltresListeVillages: boolean = false
  filtresListeVillagesForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    canton: new FormControl(null, []),
  })

  nouveauVillageForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    cantonId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationVillageForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    cantonId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionVillageForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private villageService: VillageService,
    private cantonService: CantonService,
  ) {
    this.getVillages()
    this.getCantons()
  }

  getVillages(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeVillagesForm.value)

    this.villageService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Village>) => {
          console.log(value)
          this.listeVillages = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des villages' })
        }
      })
  }

  getCantons(): void {
    this.cantonService.getAllData()
      .subscribe({
        next: (value: Canton[]) => {
          this.cantons = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des cantons' })
        }
      })
  }

  annulerRechercheVillage(): void {
    this.filtresListeVillagesForm.get('search')!.setValue(null)
    this.filtrerListeVillages()
  }

  filtrerListeVillages(page?: number, paginationSize?: number): void {
    this.getVillages({ page: this.listeVillages.currentPage, paginationSize: this.listeVillages.paginationSize! })
  }

  effacerFiltresListeVillages(): void {
    this.filtresListeVillagesForm.reset()

    this.filtrerListeVillages()
  }

  validerCreationVillage(): void {
    this.nouveauVillageForm.markAllAsTouched()
    // console.log(this.nouveauVillageForm.value)
    if (this.nouveauVillageForm.valid) {
      let village: Village = this.nouveauVillageForm.value

      this.villageService.create(village)
        .subscribe({
          next: (value: Village) => {
            this.getVillages()
            this.closeNouveauVillageModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce village a été créé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un village avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création du village' })
            }
          },
        })
    }
  }

  annulerCreationVillage(): void {
    this.closeNouveauVillageModal()
  }

  validerModificationVillage(): void {
    console.log(this.modificationVillageForm.value)
    this.modificationVillageForm.markAllAsTouched()

    if (this.modificationVillageForm.valid) {
      let village: Village = this.modificationVillageForm.value

      this.villageService.update(village)
        .subscribe({
          next: (value: Village) => {
            this.getVillages()
            this.closeModificationVillageModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce village a été mis à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un village avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du village' })
            }
          },
        })
    }
  }

  annulerModificationVillage(): void {
    this.closeModificationVillageModal()
  }

  validerSuppressionVillage(): void {
    console.log(this.suppressionVillageForm.value)
    this.suppressionVillageForm.markAllAsTouched()

    if (this.suppressionVillageForm.valid) {
      let villageId: Village['id'] = this.suppressionVillageForm.get('id')!.value

      this.villageService.delete(villageId!)
        .subscribe({
          next: (value: Village) => {
            this.getVillages()
            this.closeSuppressionVillageModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce village a été supprimé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression du village' })
          },
        })
    }
  }

  annulerSuppressionVillage(): void {
    this.closeSuppressionVillageModal()
  }

  // Modals
  openNouveauVillageModal(): void {
    this.showNouveauVillageModal = true
  }

  closeNouveauVillageModal(): void {
    this.showNouveauVillageModal = false
    this.nouveauVillageForm.reset()
  }

  openModificationVillageModal(index: number): void {
    const selectedVillage: Village | undefined = this.listeVillages.data[index]

    if (selectedVillage != undefined) {
      this.getCantons()
      this.modificationVillageForm.get('id')?.setValue(selectedVillage.id)
      this.modificationVillageForm.get('libelle')?.setValue(selectedVillage.libelle)
      this.modificationVillageForm.get('cantonId')?.setValue(selectedVillage.cantonId)
      this.modificationVillageForm.get('description')?.setValue(selectedVillage.description)

      this.showModificationVillageModal = true
    }
  }

  closeModificationVillageModal(): void {
    this.showModificationVillageModal = false
    this.modificationVillageForm.reset()
  }

  openSuppressionVillageModal(index: number): void {
    const selectedVillage: Village | undefined = this.listeVillages.data[index]

    if (selectedVillage != undefined) {
      this.suppressionVillageForm.get('id')?.setValue(selectedVillage.id)

      this.showSuppressionVillageModal = true
    }
  }

  closeSuppressionVillageModal(): void {
    this.showSuppressionVillageModal = false
    this.suppressionVillageForm.reset()
  }

}
