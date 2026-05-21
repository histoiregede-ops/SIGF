import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Diminution } from '../../../../../data/modules/gestion-dossiers/models/Diminution';
import { ModeAlienation } from '../../../../../data/modules/gestion-dossiers/models/ModeAlienation';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { DiminutionService } from '../../../../../data/modules/gestion-dossiers/services/diminution.service';
import { ModeAlienationService } from '../../../../../data/modules/gestion-dossiers/services/mode-alienation.service';
import { ContenanceUtils } from '../../../../../data/utils/ContenanceUtils';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-section-diminutions-titre-foncier',
  templateUrl: './section-diminutions-titre-foncier.component.html',
  styleUrl: './section-diminutions-titre-foncier.component.scss'
})
export class SectionDiminutionsTitreFoncierComponent implements OnChanges {

  @Input() titreFoncier?: TitreFoncier

  modesAlienation: ModeAlienation[] = []

  showNouvelleDiminutionModal: boolean = false
  showModificationDiminutionModal: boolean = false
  showSuppressionDiminutionModal: boolean = false

  listeDiminutions: PagingData<Diminution> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  filtresListeDiminutionsForm: FormGroup = new FormGroup({
    titreFoncierId: new FormControl(null, [Validators.required]),
    search: new FormControl(null, []),
    dateInscription: new FormControl(null, []),
    mode: new FormControl(null, []),
  })

  nouvelleDiminutionForm: FormGroup = new FormGroup({
    numeroBordereauAnalytique: new FormControl(null, [Validators.required]),
    dateInscription: new FormControl(null, [Validators.required]),
    numeroTitreAliene: new FormControl(null, [Validators.required]),
    designationImmeuble: new FormControl(null, [Validators.required]),
    modeAlienationId: new FormControl(null, [Validators.required]),
    contenanceParcelleAlieneeEnHectare: new FormControl(null, [Validators.required]),
    contenanceParcelleAlieneeEnCentiare: new FormControl(null, [Validators.required]),
    contenanceParcelleAlieneeEnAre: new FormControl(null, [Validators.required]),
    prixAlienation: new FormControl(null, []),
  })

  modificationDiminutionForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    numeroBordereauAnalytique: new FormControl(null, [Validators.required]),
    dateInscription: new FormControl(null, [Validators.required]),
    numeroTitreAliene: new FormControl(null, [Validators.required]),
    designationImmeuble: new FormControl(null, [Validators.required]),
    modeAlienationId: new FormControl(null, [Validators.required]),
    contenanceParcelleAlieneeEnHectare: new FormControl(null, [Validators.required]),
    contenanceParcelleAlieneeEnCentiare: new FormControl(null, [Validators.required]),
    contenanceParcelleAlieneeEnAre: new FormControl(null, [Validators.required]),
    prixAlienation: new FormControl(null, []),
  })

  suppressionDiminutionForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private notificationsHandlerService: NotificationsHandlerService,
    private modeAlienationService: ModeAlienationService,
    private diminutionService: DiminutionService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['titreFoncier'].previousValue != changes['titreFoncier'].currentValue) {
      if (this.titreFoncier) {
        this.filtresListeDiminutionsForm.get('titreFoncierId')!.setValue(this.titreFoncier.id)
        this.getDiminutions()
      }
    }
  }

  getModesAlienation(): void {
    this.modeAlienationService.getAllData()
      .subscribe({
        next: (value: ModeAlienation[]) => {
          // console.log(value)
          this.modesAlienation = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des modes d\'aliénation' })
        }
      })
  }

  getDiminutions(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    if (this.filtresListeDiminutionsForm.valid) {
      const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeDiminutionsForm.value)

      this.diminutionService.getAll(event.page, event.paginationSize, filtres)
        .subscribe({
          next: (value: PagingData<Diminution>) => {
            console.log("Diminution: ", value)
            this.listeDiminutions = value
          },
          error: (err: HttpErrorResponse) => {
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des diminutions' })
          }
        })
    }
    else {
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des diminutions' })
    }

  }

  filtrerListeDiminutions(): void {
    // console.log(this.filtresListeDiminutionsForm.value)
    this.getDiminutions({ page: this.listeDiminutions.currentPage, paginationSize: this.listeDiminutions.paginationSize! })
  }

  effacerFiltresListeDiminutions(): void {
    this.filtresListeDiminutionsForm.reset()

    this.filtrerListeDiminutions()
  }

  validerCreationDiminution(): void {
    this.nouvelleDiminutionForm.markAllAsTouched()
    // console.log(this.nouvelleDiminutionForm.value)
    if (this.nouvelleDiminutionForm.valid && this.titreFoncier) {
      let diminution: Diminution = this.nouvelleDiminutionForm.value
      diminution.titreFoncierId = this.titreFoncier.id

      this.diminutionService.create(diminution)
        .subscribe({
          next: (value: Diminution) => {
            this.getDiminutions()
            this.closeNouvelleDiminutionModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette diminution a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerCreationDiminution(): void {
    this.closeNouvelleDiminutionModal()
  }

  validerModificationDiminution(): void {
    console.log(this.modificationDiminutionForm.value)
    this.modificationDiminutionForm.markAllAsTouched()

    if (this.modificationDiminutionForm.valid) {
      let diminution: Diminution = this.modificationDiminutionForm.value

      this.diminutionService.update(diminution)
        .subscribe({
          next: (value: Diminution) => {
            this.getDiminutions()
            this.closeModificationDiminutionModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette diminution a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerModificationDiminution(): void {
    this.closeModificationDiminutionModal()
  }

  validerSuppressionDiminution(): void {
    console.log(this.suppressionDiminutionForm.value)
    this.suppressionDiminutionForm.markAllAsTouched()

    if (this.suppressionDiminutionForm.valid) {
      let diminutionId: Diminution['id'] = this.suppressionDiminutionForm.get('id')!.value

      this.diminutionService.delete(diminutionId!)
        .subscribe({
          next: (value: Diminution) => {
            this.getDiminutions()
            this.closeSuppressionDiminutionModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette diminution a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la région' })
          },
        })
    }
  }

  annulerSuppressionDiminution(): void {
    this.closeSuppressionDiminutionModal()
  }

  // Modals
  openNouvelleDiminutionModal(): void {
    this.showNouvelleDiminutionModal = true
  }

  closeNouvelleDiminutionModal(): void {
    this.showNouvelleDiminutionModal = false
    this.nouvelleDiminutionForm.reset()
  }

  openModificationDiminutionModal(index: number): void {
    const selectedDiminution: Diminution | undefined = this.listeDiminutions.data[index]

    if (selectedDiminution != undefined) {
      this.getModesAlienation()
      this.modificationDiminutionForm.patchValue(selectedDiminution)
      this.showModificationDiminutionModal = true
    }
  }

  closeModificationDiminutionModal(): void {
    this.showModificationDiminutionModal = false
    this.modificationDiminutionForm.reset()
  }

  openSuppressionDiminutionModal(index: number): void {
    const selectedDiminution: Diminution | undefined = this.listeDiminutions.data[index]

    if (selectedDiminution != undefined) {
      this.suppressionDiminutionForm.get('id')?.setValue(selectedDiminution.id)

      this.showSuppressionDiminutionModal = true
    }
  }

  closeSuppressionDiminutionModal(): void {
    this.showSuppressionDiminutionModal = false
    this.suppressionDiminutionForm.reset()
  }

  // Utils
  getValeurContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): string {
    return ContenanceUtils.getInstance().getValeurContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }

  getSuperficieContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): number {
    return ContenanceUtils.getInstance().getSuperficieContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }

}
