import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContenanceUtils } from '../../../../../data/utils/ContenanceUtils';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Augmentation } from '../../../../../data/modules/gestion-dossiers/models/Augmentation';
import { ModeAcquisition } from '../../../../../data/modules/gestion-dossiers/models/ModeAcquisition';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { AugmentationService } from '../../../../../data/modules/gestion-dossiers/services/augmentation.service';
import { ModeAcquisitionService } from '../../../../../data/modules/gestion-dossiers/services/mode-acquisition.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-section-augmentations-titre-foncier',
  templateUrl: './section-augmentations-titre-foncier.component.html',
  styleUrl: './section-augmentations-titre-foncier.component.scss'
})
export class SectionAugmentationsTitreFoncierComponent implements OnChanges {

  @Input() titreFoncier?: TitreFoncier
  
  modesAcquisition: ModeAcquisition[] = []

  showNouvelleAugmentationModal: boolean = false
  showModificationAugmentationModal: boolean = false
  showSuppressionAugmentationModal: boolean = false

  listeAugmentations: PagingData<Augmentation> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  filtresListeAugmentationsForm: FormGroup = new FormGroup({
    titreFoncierId: new FormControl(null, [Validators.required]),
    search: new FormControl(null, []),
    dateInscription: new FormControl(null, []),
    mode: new FormControl(null, []),
  })

  nouvelleAugmentationForm: FormGroup = new FormGroup({
    numeroBordereauAnalytique: new FormControl(null, [Validators.required]),
    dateInscription: new FormControl(null, [Validators.required]),
    numeroTitreAcquis: new FormControl(null, [Validators.required]),
    designationImmeuble: new FormControl(null, [Validators.required]),
    modeAcquisitionId: new FormControl(null, [Validators.required]),
    contenanceImmeubleAcquisEnHectare: new FormControl(null, [Validators.required]),
    contenanceImmeubleAcquisEnCentiare: new FormControl(null, [Validators.required]),
    contenanceImmeubleAcquisEnAre: new FormControl(null, [Validators.required]),
    prixAcquisition: new FormControl(null, []),
  })

  modificationAugmentationForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    numeroBordereauAnalytique: new FormControl(null, [Validators.required]),
    dateInscription: new FormControl(null, [Validators.required]),
    numeroTitreAcquis: new FormControl(null, [Validators.required]),
    designationImmeuble: new FormControl(null, [Validators.required]),
    modeAcquisitionId: new FormControl(null, [Validators.required]),
    contenanceImmeubleAcquisEnHectare: new FormControl(null, [Validators.required]),
    contenanceImmeubleAcquisEnCentiare: new FormControl(null, [Validators.required]),
    contenanceImmeubleAcquisEnAre: new FormControl(null, [Validators.required]),
    prixAcquisition: new FormControl(null, []),
  })

  suppressionAugmentationForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private notificationsHandlerService: NotificationsHandlerService,
    private modeAcquisitionService: ModeAcquisitionService,
    private augmentationService: AugmentationService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['titreFoncier'].previousValue != changes['titreFoncier'].currentValue) {
      if(this.titreFoncier) {
      this.filtresListeAugmentationsForm.get('titreFoncierId')!.setValue(this.titreFoncier.id)
      this.getAugmentations()
      }
    }
  }

  getModesAcquisition(): void {
    this.modeAcquisitionService.getAllData()
      .subscribe({
        next: (value: ModeAcquisition[]) => {
          // console.log(value)
          this.modesAcquisition = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des modes d\'acquisition' })
        }
      })
  }

  getAugmentations(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    if (this.filtresListeAugmentationsForm.valid) {
      const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeAugmentationsForm.value)

      this.augmentationService.getAll(event.page, event.paginationSize, filtres)
        .subscribe({
          next: (value: PagingData<Augmentation>) => {
            console.log("Augmentation: ", value)
            this.listeAugmentations = value
          },
          error: (err: HttpErrorResponse) => {
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des augmentations' })
          }
        })
    }
    else {
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des augmentations' })
    }

  }

  filtrerListeAugmentations(): void {
    // console.log(this.filtresListeAugmentationsForm.value)
    this.getAugmentations({ page: this.listeAugmentations.currentPage, paginationSize: this.listeAugmentations.paginationSize! })
  }

  effacerFiltresListeAugmentations(): void {
    this.filtresListeAugmentationsForm.reset()

    this.filtrerListeAugmentations()
  }

  validerCreationAugmentation(): void {
    this.nouvelleAugmentationForm.markAllAsTouched()
    // console.log(this.nouvelleAugmentationForm.value)
    if (this.nouvelleAugmentationForm.valid && this.titreFoncier) {
      let augmentation: Augmentation = this.nouvelleAugmentationForm.value
      augmentation.titreFoncierId = this.titreFoncier.id

      this.augmentationService.create(augmentation)
        .subscribe({
          next: (value: Augmentation) => {
            this.getAugmentations()
            this.closeNouvelleAugmentationModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette augmentation a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerCreationAugmentation(): void {
    this.closeNouvelleAugmentationModal()
  }

  validerModificationAugmentation(): void {
    console.log(this.modificationAugmentationForm.value)
    this.modificationAugmentationForm.markAllAsTouched()

    if (this.modificationAugmentationForm.valid) {
      let augmentation: Augmentation = this.modificationAugmentationForm.value

      this.augmentationService.update(augmentation)
        .subscribe({
          next: (value: Augmentation) => {
            this.getAugmentations()
            this.closeModificationAugmentationModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette augmentation a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerModificationAugmentation(): void {
    this.closeModificationAugmentationModal()
  }

  validerSuppressionAugmentation(): void {
    console.log(this.suppressionAugmentationForm.value)
    this.suppressionAugmentationForm.markAllAsTouched()

    if (this.suppressionAugmentationForm.valid) {
      let augmentationId: Augmentation['id'] = this.suppressionAugmentationForm.get('id')!.value

      this.augmentationService.delete(augmentationId!)
        .subscribe({
          next: (value: Augmentation) => {
            this.getAugmentations()
            this.closeSuppressionAugmentationModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette augmentation a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la région' })
          },
        })
    }
  }

  annulerSuppressionAugmentation(): void {
    this.closeSuppressionAugmentationModal()
  }

  // Modals
  openNouvelleAugmentationModal(): void {
    this.showNouvelleAugmentationModal = true
  }

  closeNouvelleAugmentationModal(): void {
    this.showNouvelleAugmentationModal = false
    this.nouvelleAugmentationForm.reset()
  }

  openModificationAugmentationModal(index: number): void {
    const selectedAugmentation: Augmentation | undefined = this.listeAugmentations.data[index]

    if (selectedAugmentation != undefined) {
      this.getModesAcquisition()
      this.modificationAugmentationForm.patchValue(selectedAugmentation)
      this.showModificationAugmentationModal = true
    }
  }

  closeModificationAugmentationModal(): void {
    this.showModificationAugmentationModal = false
    this.modificationAugmentationForm.reset()
  }

  openSuppressionAugmentationModal(index: number): void {
    const selectedAugmentation: Augmentation | undefined = this.listeAugmentations.data[index]

    if (selectedAugmentation != undefined) {
      this.suppressionAugmentationForm.get('id')?.setValue(selectedAugmentation.id)

      this.showSuppressionAugmentationModal = true
    }
  }

  closeSuppressionAugmentationModal(): void {
    this.showSuppressionAugmentationModal = false
    this.suppressionAugmentationForm.reset()
  }

  // Utils
  getValeurContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): string {
    return ContenanceUtils.getInstance().getValeurContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }

  getSuperficieContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): number {
    return ContenanceUtils.getInstance().getSuperficieContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }
}
