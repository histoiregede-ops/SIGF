import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { DroitReelConstitueParDenombrement } from '../../../../../data/modules/gestion-dossiers/models/DroitReelConstitueParDenombrement';
import { DroitReelConstitueParDenombrementService } from '../../../../../data/modules/gestion-dossiers/services/droit-reel-constitue-par-denombrement.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-section-droits-reels-constitues-par-denombrement-titre-foncier',
  templateUrl: './section-droits-reels-constitues-par-denombrement-titre-foncier.component.html',
  styleUrl: './section-droits-reels-constitues-par-denombrement-titre-foncier.component.scss'
})
export class SectionDroitsReelsConstituesParDenombrementTitreFoncierComponent implements OnChanges {

  @Input() titreFoncier?: TitreFoncier
  
  showNouveauDroitReelConstitueParDenombrementModal: boolean = false
  showModificationDroitReelConstitueParDenombrementModal: boolean = false
  showSuppressionDroitReelConstitueParDenombrementModal: boolean = false

  listeDroitsReelsConstituesParDenombrement: PagingData<DroitReelConstitueParDenombrement> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  filtresListeDroitsReelsConstituesParDenombrementForm: FormGroup = new FormGroup({
    titreFoncierId: new FormControl(null, [Validators.required]),
    search: new FormControl(null, []),
    dateInscription: new FormControl(null, []),
    dateRadiation: new FormControl(null, []),
  })

  nouveauDroitReelConstitueParDenombrementForm: FormGroup = new FormGroup({
    numeroBordereauAnalytiqueConstitution: new FormControl(null, [Validators.required]),
    dateInscription: new FormControl(null, [Validators.required]),
    indicationChargeOuConstitue: new FormControl(null, [Validators.required]),
    prix: new FormControl(null, []),
    numeroBordereauAnalytiqueRadiation: new FormControl(null, []),
    dateRadiation: new FormControl(null, []),
  })

  modificationDroitReelConstitueParDenombrementForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    numeroBordereauAnalytiqueConstitution: new FormControl(null, [Validators.required]),
    dateInscription: new FormControl(null, [Validators.required]),
    indicationChargeOuConstitue: new FormControl(null, [Validators.required]),
    prix: new FormControl(null, []),
    numeroBordereauAnalytiqueRadiation: new FormControl(null, []),
    dateRadiation: new FormControl(null, []),
  })

  suppressionDroitReelConstitueParDenombrementForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private notificationsHandlerService: NotificationsHandlerService,
    private droitReelConstitueParDenombrementService: DroitReelConstitueParDenombrementService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['titreFoncier'].previousValue != changes['titreFoncier'].currentValue) {
      if(this.titreFoncier) {
      this.filtresListeDroitsReelsConstituesParDenombrementForm.get('titreFoncierId')!.setValue(this.titreFoncier.id)
      this.getDroitsReelsConstituesParDenombrement()
      }
    }
  }

  getDroitsReelsConstituesParDenombrement(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    if (this.filtresListeDroitsReelsConstituesParDenombrementForm.valid) {
      const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeDroitsReelsConstituesParDenombrementForm.value)

      this.droitReelConstitueParDenombrementService.getAll(event.page, event.paginationSize, filtres)
        .subscribe({
          next: (value: PagingData<DroitReelConstitueParDenombrement>) => {
            console.log("DroitReelConstitueParDenombrement: ", value)
            this.listeDroitsReelsConstituesParDenombrement = value
          },
          error: (err: HttpErrorResponse) => {
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des droits réels constitués par dénombrement' })
          }
        })
    }
    else {
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des droits réels constitués par dénombrement' })
    }

  }

  filtrerListeDroitsReelsConstituesParDenombrement(): void {
    // console.log(this.filtresListeDroitsReelsConstituesParDenombrementForm.value)
    this.getDroitsReelsConstituesParDenombrement({ page: this.listeDroitsReelsConstituesParDenombrement.currentPage, paginationSize: this.listeDroitsReelsConstituesParDenombrement.paginationSize! })
  }

  effacerFiltresListeDroitsReelsConstituesParDenombrement(): void {
    this.filtresListeDroitsReelsConstituesParDenombrementForm.reset()

    this.filtrerListeDroitsReelsConstituesParDenombrement()
  }

  validerCreationDroitReelConstitueParDenombrement(): void {
    this.nouveauDroitReelConstitueParDenombrementForm.markAllAsTouched()
    // console.log(this.nouveauDroitReelConstitueParDenombrementForm.value)
    if (this.nouveauDroitReelConstitueParDenombrementForm.valid && this.titreFoncier) {
      let droitReelConstitueParDenombrement: DroitReelConstitueParDenombrement = this.nouveauDroitReelConstitueParDenombrementForm.value
      droitReelConstitueParDenombrement.titreFoncierId = this.titreFoncier.id

      this.droitReelConstitueParDenombrementService.create(droitReelConstitueParDenombrement)
        .subscribe({
          next: (value: DroitReelConstitueParDenombrement) => {
            this.getDroitsReelsConstituesParDenombrement()
            this.closeNouveauDroitReelConstitueParDenombrementModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce droit réel constitué par dénombrement a été créé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerCreationDroitReelConstitueParDenombrement(): void {
    this.closeNouveauDroitReelConstitueParDenombrementModal()
  }

  validerModificationDroitReelConstitueParDenombrement(): void {
    console.log(this.modificationDroitReelConstitueParDenombrementForm.value)
    this.modificationDroitReelConstitueParDenombrementForm.markAllAsTouched()

    if (this.modificationDroitReelConstitueParDenombrementForm.valid) {
      let droitReelConstitueParDenombrement: DroitReelConstitueParDenombrement = this.modificationDroitReelConstitueParDenombrementForm.value

      this.droitReelConstitueParDenombrementService.update(droitReelConstitueParDenombrement)
        .subscribe({
          next: (value: DroitReelConstitueParDenombrement) => {
            this.getDroitsReelsConstituesParDenombrement()
            this.closeModificationDroitReelConstitueParDenombrementModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce droit réel constitué par dénombrement a été mis à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerModificationDroitReelConstitueParDenombrement(): void {
    this.closeModificationDroitReelConstitueParDenombrementModal()
  }

  validerSuppressionDroitReelConstitueParDenombrement(): void {
    console.log(this.suppressionDroitReelConstitueParDenombrementForm.value)
    this.suppressionDroitReelConstitueParDenombrementForm.markAllAsTouched()

    if (this.suppressionDroitReelConstitueParDenombrementForm.valid) {
      let droitReelConstitueParDenombrementId: DroitReelConstitueParDenombrement['id'] = this.suppressionDroitReelConstitueParDenombrementForm.get('id')!.value

      this.droitReelConstitueParDenombrementService.delete(droitReelConstitueParDenombrementId!)
        .subscribe({
          next: (value: DroitReelConstitueParDenombrement) => {
            this.getDroitsReelsConstituesParDenombrement()
            this.closeSuppressionDroitReelConstitueParDenombrementModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce droit réel constitué par dénombrement a été supprimé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression du droit réel constitué par dénombrement' })
          },
        })
    }
  }

  annulerSuppressionDroitReelConstitueParDenombrement(): void {
    this.closeSuppressionDroitReelConstitueParDenombrementModal()
  }

  // Modals
  openNouveauDroitReelConstitueParDenombrementModal(): void {
    this.showNouveauDroitReelConstitueParDenombrementModal = true
  }

  closeNouveauDroitReelConstitueParDenombrementModal(): void {
    this.showNouveauDroitReelConstitueParDenombrementModal = false
    this.nouveauDroitReelConstitueParDenombrementForm.reset()
  }

  openModificationDroitReelConstitueParDenombrementModal(index: number): void {
    const selectedDroitReelConstitueParDenombrement: DroitReelConstitueParDenombrement | undefined = this.listeDroitsReelsConstituesParDenombrement.data[index]

    if (selectedDroitReelConstitueParDenombrement != undefined) {
      this.modificationDroitReelConstitueParDenombrementForm.patchValue(selectedDroitReelConstitueParDenombrement)
      this.showModificationDroitReelConstitueParDenombrementModal = true
    }
  }

  closeModificationDroitReelConstitueParDenombrementModal(): void {
    this.showModificationDroitReelConstitueParDenombrementModal = false
    this.modificationDroitReelConstitueParDenombrementForm.reset()
  }

  openSuppressionDroitReelConstitueParDenombrementModal(index: number): void {
    const selectedDroitReelConstitueParDenombrement: DroitReelConstitueParDenombrement | undefined = this.listeDroitsReelsConstituesParDenombrement.data[index]

    if (selectedDroitReelConstitueParDenombrement != undefined) {
      this.suppressionDroitReelConstitueParDenombrementForm.get('id')?.setValue(selectedDroitReelConstitueParDenombrement.id)

      this.showSuppressionDroitReelConstitueParDenombrementModal = true
    }
  }

  closeSuppressionDroitReelConstitueParDenombrementModal(): void {
    this.showSuppressionDroitReelConstitueParDenombrementModal = false
    this.suppressionDroitReelConstitueParDenombrementForm.reset()
  }

}
