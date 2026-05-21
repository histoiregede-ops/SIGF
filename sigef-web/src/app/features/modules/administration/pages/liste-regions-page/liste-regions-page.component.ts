import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { RegionService } from '../../../../../data/modules/commun/services/region.service';
import { Region } from '../../../../../data/modules/commun/models/Region';
import { Periode } from '../../../../../data/modules/commun/models/Periode';
import { PeriodeService } from '../../../../../data/modules/commun/services/periode.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-regions-page',
  templateUrl: './liste-regions-page.component.html',
  styleUrl: './liste-regions-page.component.scss'
})
export class ListeRegionsPageComponent {

  showNouvelleRegionModal: boolean = false
  showModificationRegionModal: boolean = false
  showSuppressionRegionModal: boolean = false

  listeRegions: PagingData<Region> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  periodes: Periode[] = []

  masquerfiltresListeRegions: boolean = false
  filtresListeRegionsForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    periode: new FormControl(null, []),
    actuelle: new FormControl(null, []),
  })

  nouvelleRegionForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    sigle: new FormControl(null, [Validators.required]),
    periodeId: new FormControl(null, [Validators.required]),
    actuelle: new FormControl(true, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationRegionForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    sigle: new FormControl(null, [Validators.required]),
    periodeId: new FormControl(null, [Validators.required]),
    actuelle: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionRegionForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private regionService: RegionService,
    private periodeService: PeriodeService,
  ) {
    this.getRegions()
    this.getPeriodes()
  }

  getRegions(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeRegionsForm.value)

    this.regionService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Region>) => {
          console.log(value)
          this.listeRegions = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des régions' })
        }
      })
  }

  getPeriodes(): void {
    this.periodeService.getAllData()
      .subscribe({
        next: (value: Periode[]) => {
          this.periodes = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des périodes' })
        }
      })
  }

  annulerRechercheRegion(): void {
    this.filtresListeRegionsForm.get('search')!.setValue(null)
    this.filtrerListeRegions()
  }

  filtrerListeRegions(page?: number, paginationSize?: number): void {
    this.getRegions({ page: this.listeRegions.currentPage, paginationSize: this.listeRegions.paginationSize! })
  }

  effacerFiltresListeRegions(): void {
    this.filtresListeRegionsForm.reset()

    this.filtrerListeRegions()
  }

  validerCreationRegion(): void {
    this.nouvelleRegionForm.markAllAsTouched()
    // console.log(this.nouvelleRegionForm.value)
    if (this.nouvelleRegionForm.valid) {
      let region: Region = this.nouvelleRegionForm.value

      this.regionService.create(region)
        .subscribe({
          next: (value: Region) => {
            this.getRegions()
            this.closeNouvelleRegionModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette region a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une région avec le même libellé ou le même sigle existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de la région' })
            }
          },
        })
    }
  }

  annulerCreationRegion(): void {
    this.closeNouvelleRegionModal()
  }

  validerModificationRegion(): void {
    console.log(this.modificationRegionForm.value)
    this.modificationRegionForm.markAllAsTouched()

    if (this.modificationRegionForm.valid) {
      let region: Region = this.modificationRegionForm.value

      this.regionService.update(region)
        .subscribe({
          next: (value: Region) => {
            this.getRegions()
            this.closeModificationRegionModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette region a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une région avec le même libellé ou le même sigle existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la région' })
            }
          },
        })
    }
  }

  annulerModificationRegion(): void {
    this.closeModificationRegionModal()
  }

  validerSuppressionRegion(): void {
    console.log(this.suppressionRegionForm.value)
    this.suppressionRegionForm.markAllAsTouched()

    if (this.suppressionRegionForm.valid) {
      let regionId: Region['id'] = this.suppressionRegionForm.get('id')!.value

      this.regionService.delete(regionId!)
        .subscribe({
          next: (value: Region) => {
            this.getRegions()
            this.closeSuppressionRegionModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette region a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la région' })
          },
        })
    }
  }

  annulerSuppressionRegion(): void {
    this.closeSuppressionRegionModal()
  }

  // Modals
  openNouvelleRegionModal(): void {
    this.showNouvelleRegionModal = true
  }

  closeNouvelleRegionModal(): void {
    this.showNouvelleRegionModal = false
    this.nouvelleRegionForm.reset()
  }

  openModificationRegionModal(index: number): void {
    const selectedRegion: Region | undefined = this.listeRegions.data[index]

    if (selectedRegion != undefined) {
      this.getPeriodes()
      this.modificationRegionForm.get('id')?.setValue(selectedRegion.id)
      this.modificationRegionForm.get('libelle')?.setValue(selectedRegion.libelle)
      this.modificationRegionForm.get('sigle')?.setValue(selectedRegion.sigle)
      this.modificationRegionForm.get('periodeId')?.setValue(selectedRegion.periodeId)
      this.modificationRegionForm.get('actuelle')?.setValue(selectedRegion.actuelle)
      this.modificationRegionForm.get('description')?.setValue(selectedRegion.description)

      this.showModificationRegionModal = true
    }
  }

  closeModificationRegionModal(): void {
    this.showModificationRegionModal = false
    this.modificationRegionForm.reset()
  }

  openSuppressionRegionModal(index: number): void {
    const selectedRegion: Region | undefined = this.listeRegions.data[index]

    if (selectedRegion != undefined) {
      this.suppressionRegionForm.get('id')?.setValue(selectedRegion.id)

      this.showSuppressionRegionModal = true
    }
  }

  closeSuppressionRegionModal(): void {
    this.showSuppressionRegionModal = false
    this.suppressionRegionForm.reset()
  }
}
