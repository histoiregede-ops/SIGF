import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Commune } from '../../../../../data/modules/commun/models/Commune';
import { Prefecture } from '../../../../../data/modules/commun/models/Prefecture';
import { CommuneService } from '../../../../../data/modules/commun/services/commune.service';
import { PrefectureService } from '../../../../../data/modules/commun/services/prefecture.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-communes-page',
  templateUrl: './liste-communes-page.component.html',
  styleUrl: './liste-communes-page.component.scss'
})
export class ListeCommunesPageComponent {
  
  showNouvelleCommuneModal: boolean = false
  showModificationCommuneModal: boolean = false
  showSuppressionCommuneModal: boolean = false

  listeCommunes: PagingData<Commune> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  prefectures: Prefecture[] = []

  masquerfiltresListeCommunes: boolean = false
  filtresListeCommunesForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    prefecture: new FormControl(null, []),
  })

  nouvelleCommuneForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    prefectureId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationCommuneForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    prefectureId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionCommuneForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private communeService: CommuneService,
    private prefectureService: PrefectureService,
  ) {
    this.getCommunes()
    this.getPrefectures()
  }

  getCommunes(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeCommunesForm.value)

    this.communeService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Commune>) => {
          console.log(value)
          this.listeCommunes = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des communes' })
        }
      })
  }

  getPrefectures(): void {
    this.prefectureService.getAllData()
      .subscribe({
        next: (value: Prefecture[]) => {
          this.prefectures = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des préfectures' })
        }
      })
  }

  annulerRechercheCommune(): void {
    this.filtresListeCommunesForm.get('search')!.setValue(null)
    this.filtrerListeCommunes()
  }

  filtrerListeCommunes(page?: number, paginationSize?: number): void {
    this.getCommunes({ page: this.listeCommunes.currentPage, paginationSize: this.listeCommunes.paginationSize! })
  }

  effacerFiltresListeCommunes(): void {
    this.filtresListeCommunesForm.reset()

    this.filtrerListeCommunes()
  }

  validerCreationCommune(): void {
    this.nouvelleCommuneForm.markAllAsTouched()
    // console.log(this.nouvelleCommuneForm.value)
    if (this.nouvelleCommuneForm.valid) {
      let commune: Commune = this.nouvelleCommuneForm.value

      this.communeService.create(commune)
        .subscribe({
          next: (value: Commune) => {
            this.getCommunes()
            this.closeNouvelleCommuneModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette commune a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une commune avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de la commune' })
            }
          },
        })
    }
  }

  annulerCreationCommune(): void {
    this.closeNouvelleCommuneModal()
  }

  validerModificationCommune(): void {
    console.log(this.modificationCommuneForm.value)
    this.modificationCommuneForm.markAllAsTouched()

    if (this.modificationCommuneForm.valid) {
      let commune: Commune = this.modificationCommuneForm.value

      this.communeService.update(commune)
        .subscribe({
          next: (value: Commune) => {
            this.getCommunes()
            this.closeModificationCommuneModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette commune a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une commune avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la commune' })
            }
          },
        })
    }
  }

  annulerModificationCommune(): void {
    this.closeModificationCommuneModal()
  }

  validerSuppressionCommune(): void {
    console.log(this.suppressionCommuneForm.value)
    this.suppressionCommuneForm.markAllAsTouched()

    if (this.suppressionCommuneForm.valid) {
      let communeId: Commune['id'] = this.suppressionCommuneForm.get('id')!.value

      this.communeService.delete(communeId!)
        .subscribe({
          next: (value: Commune) => {
            this.getCommunes()
            this.closeSuppressionCommuneModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette commune a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la commune' })
          },
        })
    }
  }

  annulerSuppressionCommune(): void {
    this.closeSuppressionCommuneModal()
  }

  // Modals
  openNouvelleCommuneModal(): void {
    this.showNouvelleCommuneModal = true
  }

  closeNouvelleCommuneModal(): void {
    this.showNouvelleCommuneModal = false
    this.nouvelleCommuneForm.reset()
  }

  openModificationCommuneModal(index: number): void {
    const selectedCommune: Commune | undefined = this.listeCommunes.data[index]

    if (selectedCommune != undefined) {
      this.getPrefectures()
      this.modificationCommuneForm.get('id')?.setValue(selectedCommune.id)
      this.modificationCommuneForm.get('libelle')?.setValue(selectedCommune.libelle)
      this.modificationCommuneForm.get('prefectureId')?.setValue(selectedCommune.prefectureId)
      this.modificationCommuneForm.get('description')?.setValue(selectedCommune.description)

      this.showModificationCommuneModal = true
    }
  }

  closeModificationCommuneModal(): void {
    this.showModificationCommuneModal = false
    this.modificationCommuneForm.reset()
  }

  openSuppressionCommuneModal(index: number): void {
    const selectedCommune: Commune | undefined = this.listeCommunes.data[index]

    if (selectedCommune != undefined) {
      this.suppressionCommuneForm.get('id')?.setValue(selectedCommune.id)

      this.showSuppressionCommuneModal = true
    }
  }

  closeSuppressionCommuneModal(): void {
    this.showSuppressionCommuneModal = false
    this.suppressionCommuneForm.reset()
  }


}
