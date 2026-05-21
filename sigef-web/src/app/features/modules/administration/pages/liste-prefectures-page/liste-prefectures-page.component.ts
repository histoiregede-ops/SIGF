import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Prefecture } from '../../../../../data/modules/commun/models/Prefecture';
import { Region } from '../../../../../data/modules/commun/models/Region';
import { PrefectureService } from '../../../../../data/modules/commun/services/prefecture.service';
import { RegionService } from '../../../../../data/modules/commun/services/region.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-prefectures-page',
  templateUrl: './liste-prefectures-page.component.html',
  styleUrl: './liste-prefectures-page.component.scss'
})
export class ListePrefecturesPageComponent {
  
  showNouvellePrefectureModal: boolean = false
  showModificationPrefectureModal: boolean = false
  showSuppressionPrefectureModal: boolean = false

  listePrefectures: PagingData<Prefecture> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  regions: Region[] = []

  masquerfiltresListePrefectures: boolean = false
  filtresListePrefecturesForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    region: new FormControl(null, []),
  })

  nouvellePrefectureForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    regionId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationPrefectureForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    regionId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionPrefectureForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private prefectureService: PrefectureService,
    private regionService: RegionService,
  ) {
    this.getPrefectures()
    this.getRegions()
  }

  getPrefectures(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListePrefecturesForm.value)

    this.prefectureService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Prefecture>) => {
          console.log(value)
          this.listePrefectures = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des préfectures' })
        }
      })
  }

  getRegions(): void {
    this.regionService.getAllData()
      .subscribe({
        next: (value: Region[]) => {
          this.regions = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des régions' })
        }
      })
  }

  annulerRecherchePrefecture(): void {
    this.filtresListePrefecturesForm.get('search')!.setValue(null)
    this.filtrerListePrefectures()
  }

  filtrerListePrefectures(page?: number, paginationSize?: number): void {
    this.getPrefectures({ page: this.listePrefectures.currentPage, paginationSize: this.listePrefectures.paginationSize! })
  }

  effacerFiltresListePrefectures(): void {
    this.filtresListePrefecturesForm.reset()

    this.filtrerListePrefectures()
  }

  validerCreationPrefecture(): void {
    this.nouvellePrefectureForm.markAllAsTouched()
    // console.log(this.nouvellePrefectureForm.value)
    if (this.nouvellePrefectureForm.valid) {
      let prefecture: Prefecture = this.nouvellePrefectureForm.value

      this.prefectureService.create(prefecture)
        .subscribe({
          next: (value: Prefecture) => {
            this.getPrefectures()
            this.closeNouvellePrefectureModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette prefecture a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une préfecture avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de la préfecture' })
            }
          },
        })
    }
  }

  annulerCreationPrefecture(): void {
    this.closeNouvellePrefectureModal()
  }

  validerModificationPrefecture(): void {
    console.log(this.modificationPrefectureForm.value)
    this.modificationPrefectureForm.markAllAsTouched()

    if (this.modificationPrefectureForm.valid) {
      let prefecture: Prefecture = this.modificationPrefectureForm.value

      this.prefectureService.update(prefecture)
        .subscribe({
          next: (value: Prefecture) => {
            this.getPrefectures()
            this.closeModificationPrefectureModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette prefecture a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une préfecture avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la préfecture' })
            }
          },
        })
    }
  }

  annulerModificationPrefecture(): void {
    this.closeModificationPrefectureModal()
  }

  validerSuppressionPrefecture(): void {
    console.log(this.suppressionPrefectureForm.value)
    this.suppressionPrefectureForm.markAllAsTouched()

    if (this.suppressionPrefectureForm.valid) {
      let prefectureId: Prefecture['id'] = this.suppressionPrefectureForm.get('id')!.value

      this.prefectureService.delete(prefectureId!)
        .subscribe({
          next: (value: Prefecture) => {
            this.getPrefectures()
            this.closeSuppressionPrefectureModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette prefecture a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la préfecture' })
          },
        })
    }
  }

  annulerSuppressionPrefecture(): void {
    this.closeSuppressionPrefectureModal()
  }

  // Modals
  openNouvellePrefectureModal(): void {
    this.showNouvellePrefectureModal = true
  }

  closeNouvellePrefectureModal(): void {
    this.showNouvellePrefectureModal = false
    this.nouvellePrefectureForm.reset()
  }

  openModificationPrefectureModal(index: number): void {
    const selectedPrefecture: Prefecture | undefined = this.listePrefectures.data[index]

    if (selectedPrefecture != undefined) {
      this.getRegions()
      this.modificationPrefectureForm.get('id')?.setValue(selectedPrefecture.id)
      this.modificationPrefectureForm.get('libelle')?.setValue(selectedPrefecture.libelle)
      this.modificationPrefectureForm.get('regionId')?.setValue(selectedPrefecture.regionId)
      this.modificationPrefectureForm.get('description')?.setValue(selectedPrefecture.description)

      this.showModificationPrefectureModal = true
    }
  }

  closeModificationPrefectureModal(): void {
    this.showModificationPrefectureModal = false
    this.modificationPrefectureForm.reset()
  }

  openSuppressionPrefectureModal(index: number): void {
    const selectedPrefecture: Prefecture | undefined = this.listePrefectures.data[index]

    if (selectedPrefecture != undefined) {
      this.suppressionPrefectureForm.get('id')?.setValue(selectedPrefecture.id)

      this.showSuppressionPrefectureModal = true
    }
  }

  closeSuppressionPrefectureModal(): void {
    this.showSuppressionPrefectureModal = false
    this.suppressionPrefectureForm.reset()
  }

}
