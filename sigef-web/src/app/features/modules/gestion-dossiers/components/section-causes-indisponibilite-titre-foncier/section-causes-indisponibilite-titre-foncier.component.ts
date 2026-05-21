import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { CauseIndisponibilite } from '../../../../../data/modules/gestion-dossiers/models/CauseIndisponibilite';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { CauseIndisponibiliteService } from '../../../../../data/modules/gestion-dossiers/services/cause-indisponibilite.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-section-causes-indisponibilite-titre-foncier',
  templateUrl: './section-causes-indisponibilite-titre-foncier.component.html',
  styleUrl: './section-causes-indisponibilite-titre-foncier.component.scss'
})
export class SectionCausesIndisponibiliteTitreFoncierComponent implements OnChanges {

  @Input() titreFoncier?: TitreFoncier
  
  showNouvelleCauseIndisponibiliteModal: boolean = false
  showModificationCauseIndisponibiliteModal: boolean = false
  showSuppressionCauseIndisponibiliteModal: boolean = false

  listeCausesIndisponibilite: PagingData<CauseIndisponibilite> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  filtresListeCausesIndisponibiliteForm: FormGroup = new FormGroup({
    titreFoncierId: new FormControl(null, [Validators.required]),
    search: new FormControl(null, []),
    dateInscription: new FormControl(null, []),
    dateRadiation: new FormControl(null, []),
  })

  nouvelleCauseIndisponibiliteForm: FormGroup = new FormGroup({
    numeroBordereauAnalytiqueStipulationExecution: new FormControl(null, [Validators.required]),
    dateInscription: new FormControl(null, [Validators.required]),
    indicationClausesConventionnelles: new FormControl(null, [Validators.required]),
    numeroBordereauAnalytiqueRadiation: new FormControl(null, []),
    dateRadiation: new FormControl(null, []),
  })

  modificationCauseIndisponibiliteForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    numeroBordereauAnalytiqueStipulationExecution: new FormControl(null, [Validators.required]),
    dateInscription: new FormControl(null, [Validators.required]),
    indicationClausesConventionnelles: new FormControl(null, [Validators.required]),
    numeroBordereauAnalytiqueRadiation: new FormControl(null, []),
    dateRadiation: new FormControl(null, []),
  })

  suppressionCauseIndisponibiliteForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private notificationsHandlerService: NotificationsHandlerService,
    private causeIndisponibiliteService: CauseIndisponibiliteService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['titreFoncier'].previousValue != changes['titreFoncier'].currentValue) {
      if(this.titreFoncier) {
      this.filtresListeCausesIndisponibiliteForm.get('titreFoncierId')!.setValue(this.titreFoncier.id)
      this.getCausesIndisponibilite()
      }
    }
  }

  getCausesIndisponibilite(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    if (this.filtresListeCausesIndisponibiliteForm.valid) {
      const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeCausesIndisponibiliteForm.value)

      this.causeIndisponibiliteService.getAll(event.page, event.paginationSize, filtres)
        .subscribe({
          next: (value: PagingData<CauseIndisponibilite>) => {
            console.log("CauseIndisponibilite: ", value)
            this.listeCausesIndisponibilite = value
          },
          error: (err: HttpErrorResponse) => {
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des causes d\indisponibilités' })
          }
        })
    }
    else {
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des causes d\indisponibilités' })
    }

  }

  filtrerListeCausesIndisponibilite(): void {
    // console.log(this.filtresListeCausesIndisponibiliteForm.value)
    this.getCausesIndisponibilite({ page: this.listeCausesIndisponibilite.currentPage, paginationSize: this.listeCausesIndisponibilite.paginationSize! })
  }

  effacerFiltresListeCausesIndisponibilite(): void {
    this.filtresListeCausesIndisponibiliteForm.reset()

    this.filtrerListeCausesIndisponibilite()
  }

  validerCreationCauseIndisponibilite(): void {
    this.nouvelleCauseIndisponibiliteForm.markAllAsTouched()
    // console.log(this.nouvelleCauseIndisponibiliteForm.value)
    if (this.nouvelleCauseIndisponibiliteForm.valid && this.titreFoncier) {
      let causeIndisponibilite: CauseIndisponibilite = this.nouvelleCauseIndisponibiliteForm.value
      causeIndisponibilite.titreFoncierId = this.titreFoncier.id

      this.causeIndisponibiliteService.create(causeIndisponibilite)
        .subscribe({
          next: (value: CauseIndisponibilite) => {
            this.getCausesIndisponibilite()
            this.closeNouvelleCauseIndisponibiliteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette cause d\'indisponibilité a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerCreationCauseIndisponibilite(): void {
    this.closeNouvelleCauseIndisponibiliteModal()
  }

  validerModificationCauseIndisponibilite(): void {
    console.log(this.modificationCauseIndisponibiliteForm.value)
    this.modificationCauseIndisponibiliteForm.markAllAsTouched()

    if (this.modificationCauseIndisponibiliteForm.valid) {
      let causeIndisponibilite: CauseIndisponibilite = this.modificationCauseIndisponibiliteForm.value

      this.causeIndisponibiliteService.update(causeIndisponibilite)
        .subscribe({
          next: (value: CauseIndisponibilite) => {
            this.getCausesIndisponibilite()
            this.closeModificationCauseIndisponibiliteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette cause d\'indisponibilité a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerModificationCauseIndisponibilite(): void {
    this.closeModificationCauseIndisponibiliteModal()
  }

  validerSuppressionCauseIndisponibilite(): void {
    console.log(this.suppressionCauseIndisponibiliteForm.value)
    this.suppressionCauseIndisponibiliteForm.markAllAsTouched()

    if (this.suppressionCauseIndisponibiliteForm.valid) {
      let causeIndisponibiliteId: CauseIndisponibilite['id'] = this.suppressionCauseIndisponibiliteForm.get('id')!.value

      this.causeIndisponibiliteService.delete(causeIndisponibiliteId!)
        .subscribe({
          next: (value: CauseIndisponibilite) => {
            this.getCausesIndisponibilite()
            this.closeSuppressionCauseIndisponibiliteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette cause d\'indisponibilité a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la cause d\'indisponibilité' })
          },
        })
    }
  }

  annulerSuppressionCauseIndisponibilite(): void {
    this.closeSuppressionCauseIndisponibiliteModal()
  }

  // Modals
  openNouvelleCauseIndisponibiliteModal(): void {
    this.showNouvelleCauseIndisponibiliteModal = true
  }

  closeNouvelleCauseIndisponibiliteModal(): void {
    this.showNouvelleCauseIndisponibiliteModal = false
    this.nouvelleCauseIndisponibiliteForm.reset()
  }

  openModificationCauseIndisponibiliteModal(index: number): void {
    const selectedCauseIndisponibilite: CauseIndisponibilite | undefined = this.listeCausesIndisponibilite.data[index]

    if (selectedCauseIndisponibilite != undefined) {
      this.modificationCauseIndisponibiliteForm.patchValue(selectedCauseIndisponibilite)
      this.showModificationCauseIndisponibiliteModal = true
    }
  }

  closeModificationCauseIndisponibiliteModal(): void {
    this.showModificationCauseIndisponibiliteModal = false
    this.modificationCauseIndisponibiliteForm.reset()
  }

  openSuppressionCauseIndisponibiliteModal(index: number): void {
    const selectedCauseIndisponibilite: CauseIndisponibilite | undefined = this.listeCausesIndisponibilite.data[index]

    if (selectedCauseIndisponibilite != undefined) {
      this.suppressionCauseIndisponibiliteForm.get('id')?.setValue(selectedCauseIndisponibilite.id)

      this.showSuppressionCauseIndisponibiliteModal = true
    }
  }

  closeSuppressionCauseIndisponibiliteModal(): void {
    this.showSuppressionCauseIndisponibiliteModal = false
    this.suppressionCauseIndisponibiliteForm.reset()
  }
}
