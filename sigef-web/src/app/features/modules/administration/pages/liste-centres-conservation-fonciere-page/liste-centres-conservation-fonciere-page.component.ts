import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { CentreConservationFonciere } from '../../../../../data/modules/auth/models/CentreConservationFonciere';
import { CentreConservationFonciereService } from '../../../../../data/modules/auth/services/centre-conservation-fonciere.service';
import { RegionService } from '../../../../../data/modules/commun/services/region.service';
import { Region } from '../../../../../data/modules/commun/models/Region';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-centres-conservation-fonciere-page',
  templateUrl: './liste-centres-conservation-fonciere-page.component.html',
  styleUrl: './liste-centres-conservation-fonciere-page.component.scss'
})
export class ListeCentresConservationFoncierePageComponent {
  
  showNouveauCentreConservationFonciereModal: boolean = false
  showModificationCentreConservationFonciereModal: boolean = false
  showSuppressionCentreConservationFonciereModal: boolean = false

  listeCentresConservationFonciere: PagingData<CentreConservationFonciere> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  regions: Region[] = []

  masquerfiltresListeCentresConservationFonciere: boolean = false
  filtresListeCentresConservationFonciereForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
  })

  nouveauCentreConservationFonciereForm: FormGroup = new FormGroup({
    nom: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
    regionId: new FormControl(null, [Validators.required]),
  })

  modificationCentreConservationFonciereForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    nom: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
    regionId: new FormControl(null, [Validators.required]),
  })

  suppressionCentreConservationFonciereForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private centreConservationFonciereService: CentreConservationFonciereService,
    private regionService: RegionService,
  ) {
    this.getCentresConservationFonciere()
    this.getRegions()
  }

  getCentresConservationFonciere(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeCentresConservationFonciereForm.value)

    this.centreConservationFonciereService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<CentreConservationFonciere>) => {
          console.log(value)
          this.listeCentresConservationFonciere = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des centres de conservation foncière' })
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

  annulerRechercheCentreConservationFonciere(): void {
    this.filtresListeCentresConservationFonciereForm.get('search')!.setValue(null)
    this.filtrerListeCentresConservationFonciere()
  }

  filtrerListeCentresConservationFonciere(page?: number, paginationSize?: number): void {
    this.getCentresConservationFonciere({ page: this.listeCentresConservationFonciere.currentPage, paginationSize: this.listeCentresConservationFonciere.paginationSize! })
  }

  effacerFiltresListeCentresConservationFonciere(): void {
    this.filtresListeCentresConservationFonciereForm.reset()

    this.filtrerListeCentresConservationFonciere()
  }

  validerCreationCentreConservationFonciere(): void {
    this.nouveauCentreConservationFonciereForm.markAllAsTouched()
    // console.log(this.nouveauCentreConservationFonciereForm.value)
    if (this.nouveauCentreConservationFonciereForm.valid) {
      let centreConservationFonciere: CentreConservationFonciere = this.nouveauCentreConservationFonciereForm.value

      this.centreConservationFonciereService.create(centreConservationFonciere)
        .subscribe({
          next: (value: CentreConservationFonciere) => {
            this.getCentresConservationFonciere()
            this.closeNouveauCentreConservationFonciereModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce centre de conservation foncière a été créé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un centre de conservation foncière avec le même nom existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création du centre de conservation foncière' })
            }
          },
        })
    }
  }

  annulerCreationCentreConservationFonciere(): void {
    this.closeNouveauCentreConservationFonciereModal()
  }

  validerModificationCentreConservationFonciere(): void {
    console.log(this.modificationCentreConservationFonciereForm.value)
    this.modificationCentreConservationFonciereForm.markAllAsTouched()

    if (this.modificationCentreConservationFonciereForm.valid) {
      let centreConservationFonciere: CentreConservationFonciere = this.modificationCentreConservationFonciereForm.value

      this.centreConservationFonciereService.update(centreConservationFonciere)
        .subscribe({
          next: (value: CentreConservationFonciere) => {
            this.getCentresConservationFonciere()
            this.closeModificationCentreConservationFonciereModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce centre de conservation foncière a été mis à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un centre de conservation foncière avec le même nom existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du centre de conservation foncière' })
            }
          },
        })
    }
  }

  annulerModificationCentreConservationFonciere(): void {
    this.closeModificationCentreConservationFonciereModal()
  }

  validerSuppressionCentreConservationFonciere(): void {
    console.log(this.suppressionCentreConservationFonciereForm.value)
    this.suppressionCentreConservationFonciereForm.markAllAsTouched()

    if (this.suppressionCentreConservationFonciereForm.valid) {
      let centreConservationFonciereId: CentreConservationFonciere['id'] = this.suppressionCentreConservationFonciereForm.get('id')!.value

      this.centreConservationFonciereService.delete(centreConservationFonciereId!)
        .subscribe({
          next: (value: CentreConservationFonciere) => {
            this.getCentresConservationFonciere()
            this.closeSuppressionCentreConservationFonciereModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce centre de conservation foncière a été supprimé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression du centre de conservation foncière' })
          },
        })
    }
  }

  annulerSuppressionCentreConservationFonciere(): void {
    this.closeSuppressionCentreConservationFonciereModal()
  }

  // Modals
  openNouveauCentreConservationFonciereModal(): void {
    this.showNouveauCentreConservationFonciereModal = true
  }

  closeNouveauCentreConservationFonciereModal(): void {
    this.showNouveauCentreConservationFonciereModal = false
    this.nouveauCentreConservationFonciereForm.reset()
  }

  openModificationCentreConservationFonciereModal(index: number): void {
    const selectedCentreConservationFonciere: CentreConservationFonciere | undefined = this.listeCentresConservationFonciere.data[index]

    if (selectedCentreConservationFonciere != undefined) {
      this.getRegions()
      this.modificationCentreConservationFonciereForm.get('id')?.setValue(selectedCentreConservationFonciere.id)
      this.modificationCentreConservationFonciereForm.get('nom')?.setValue(selectedCentreConservationFonciere.nom)
      this.modificationCentreConservationFonciereForm.get('description')?.setValue(selectedCentreConservationFonciere.description)
      this.modificationCentreConservationFonciereForm.get('regionId')?.setValue(selectedCentreConservationFonciere.regionId)

      this.showModificationCentreConservationFonciereModal = true
    }
  }

  closeModificationCentreConservationFonciereModal(): void {
    this.showModificationCentreConservationFonciereModal = false
    this.modificationCentreConservationFonciereForm.reset()
  }

  openSuppressionCentreConservationFonciereModal(index: number): void {
    const selectedCentreConservationFonciere: CentreConservationFonciere | undefined = this.listeCentresConservationFonciere.data[index]

    if (selectedCentreConservationFonciere != undefined) {
      this.suppressionCentreConservationFonciereForm.get('id')?.setValue(selectedCentreConservationFonciere.id)

      this.showSuppressionCentreConservationFonciereModal = true
    }
  }

  closeSuppressionCentreConservationFonciereModal(): void {
    this.showSuppressionCentreConservationFonciereModal = false
    this.suppressionCentreConservationFonciereForm.reset()
  }

}
