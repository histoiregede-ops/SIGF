import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { DivisionEnVolume } from '../../../../../data/modules/gestion-dossiers/models/DivisionEnVolume';
import { ModeAlienation } from '../../../../../data/modules/gestion-dossiers/models/ModeAlienation';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { ModeAlienationService } from '../../../../../data/modules/gestion-dossiers/services/mode-alienation.service';
import { ContenanceUtils } from '../../../../../data/utils/ContenanceUtils';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { DivisionEnVolumeService } from '../../../../../data/modules/gestion-dossiers/services/division-en-volume.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-section-divisions-en-volumes-titre-foncier',
  templateUrl: './section-divisions-en-volumes-titre-foncier.component.html',
  styleUrl: './section-divisions-en-volumes-titre-foncier.component.scss'
})
export class SectionDivisionsEnVolumesTitreFoncierComponent implements OnChanges {

  @Input() titreFoncier?: TitreFoncier

  modesAlienation: ModeAlienation[] = []

  showNouvelleDivisionEnVolumeModal: boolean = false
  showModificationDivisionEnVolumeModal: boolean = false
  showSuppressionDivisionEnVolumeModal: boolean = false

  listeDivisionsEnVolumes: PagingData<DivisionEnVolume> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  filtresListeDivisionsEnVolumesForm: FormGroup = new FormGroup({
    titreFoncierId: new FormControl(null, [Validators.required]),
    search: new FormControl(null, []),
    mode: new FormControl(null, []),
  })

  nouvelleDivisionEnVolumeForm: FormGroup = new FormGroup({
    numeroVolume: new FormControl(null, [Validators.required]),
    situationBatiment: new FormControl(null, [Validators.required]),
    situationNiveau: new FormControl(null, [Validators.required]),
    natureDescription: new FormControl(null, [Validators.required]),
    affectation: new FormControl(null, [Validators.required]),
    contenance: new FormControl(null, [Validators.required]),
    valeurVolume: new FormControl(null, [Validators.required]),
    mutationTitreFoncier: new FormControl(null, [Validators.required]),
    extinctionVolume: new FormControl(null, [Validators.required]),
    modeAlienationId: new FormControl(null, [Validators.required]),
  })

  modificationDivisionEnVolumeForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    numeroVolume: new FormControl(null, [Validators.required]),
    situationBatiment: new FormControl(null, [Validators.required]),
    situationNiveau: new FormControl(null, [Validators.required]),
    natureDescription: new FormControl(null, [Validators.required]),
    affectation: new FormControl(null, [Validators.required]),
    contenance: new FormControl(null, [Validators.required]),
    valeurVolume: new FormControl(null, [Validators.required]),
    mutationTitreFoncier: new FormControl(null, [Validators.required]),
    extinctionVolume: new FormControl(null, [Validators.required]),
    modeAlienationId: new FormControl(null, [Validators.required]),
  })

  suppressionDivisionEnVolumeForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private notificationsHandlerService: NotificationsHandlerService,
    private modeAlienationService: ModeAlienationService,
    private divisionEnVolumeService: DivisionEnVolumeService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['titreFoncier'].previousValue != changes['titreFoncier'].currentValue) {
      if (this.titreFoncier) {
        this.filtresListeDivisionsEnVolumesForm.get('titreFoncierId')!.setValue(this.titreFoncier.id)
        this.getDivisionsEnVolumes()
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

  getDivisionsEnVolumes(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    if (this.filtresListeDivisionsEnVolumesForm.valid) {
      const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeDivisionsEnVolumesForm.value)

      this.divisionEnVolumeService.getAll(event.page, event.paginationSize, filtres)
        .subscribe({
          next: (value: PagingData<DivisionEnVolume>) => {
            console.log("DivisionEnVolume: ", value)
            this.listeDivisionsEnVolumes = value
          },
          error: (err: HttpErrorResponse) => {
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des divisions en volumes' })
          }
        })
    }
    else {
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des divisions en volumes' })
    }

  }

  filtrerListeDivisionsEnVolumes(): void {
    // console.log(this.filtresListeDivisionsEnVolumesForm.value)
    this.getDivisionsEnVolumes({ page: this.listeDivisionsEnVolumes.currentPage, paginationSize: this.listeDivisionsEnVolumes.paginationSize! })
  }

  effacerFiltresListeDivisionsEnVolumes(): void {
    this.filtresListeDivisionsEnVolumesForm.reset()

    this.filtrerListeDivisionsEnVolumes()
  }

  validerCreationDivisionEnVolume(): void {
    this.nouvelleDivisionEnVolumeForm.markAllAsTouched()
    // console.log(this.nouvelleDivisionEnVolumeForm.value)
    if (this.nouvelleDivisionEnVolumeForm.valid && this.titreFoncier) {
      let divisionEnVolume: DivisionEnVolume = this.nouvelleDivisionEnVolumeForm.value
      divisionEnVolume.titreFoncierId = this.titreFoncier.id

      this.divisionEnVolumeService.create(divisionEnVolume)
        .subscribe({
          next: (value: DivisionEnVolume) => {
            this.getDivisionsEnVolumes()
            this.closeNouvelleDivisionEnVolumeModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette division en volume a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerCreationDivisionEnVolume(): void {
    this.closeNouvelleDivisionEnVolumeModal()
  }

  validerModificationDivisionEnVolume(): void {
    console.log(this.modificationDivisionEnVolumeForm.value)
    this.modificationDivisionEnVolumeForm.markAllAsTouched()

    if (this.modificationDivisionEnVolumeForm.valid) {
      let divisionEnVolume: DivisionEnVolume = this.modificationDivisionEnVolumeForm.value

      this.divisionEnVolumeService.update(divisionEnVolume)
        .subscribe({
          next: (value: DivisionEnVolume) => {
            this.getDivisionsEnVolumes()
            this.closeModificationDivisionEnVolumeModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette division en volume a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerModificationDivisionEnVolume(): void {
    this.closeModificationDivisionEnVolumeModal()
  }

  validerSuppressionDivisionEnVolume(): void {
    console.log(this.suppressionDivisionEnVolumeForm.value)
    this.suppressionDivisionEnVolumeForm.markAllAsTouched()

    if (this.suppressionDivisionEnVolumeForm.valid) {
      let divisionEnVolumeId: DivisionEnVolume['id'] = this.suppressionDivisionEnVolumeForm.get('id')!.value

      this.divisionEnVolumeService.delete(divisionEnVolumeId!)
        .subscribe({
          next: (value: DivisionEnVolume) => {
            this.getDivisionsEnVolumes()
            this.closeSuppressionDivisionEnVolumeModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette division en volume a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la région' })
          },
        })
    }
  }

  annulerSuppressionDivisionEnVolume(): void {
    this.closeSuppressionDivisionEnVolumeModal()
  }

  // Modals
  openNouvelleDivisionEnVolumeModal(): void {
    this.showNouvelleDivisionEnVolumeModal = true
  }

  closeNouvelleDivisionEnVolumeModal(): void {
    this.showNouvelleDivisionEnVolumeModal = false
    this.nouvelleDivisionEnVolumeForm.reset()
  }

  openModificationDivisionEnVolumeModal(index: number): void {
    const selectedDivisionEnVolume: DivisionEnVolume | undefined = this.listeDivisionsEnVolumes.data[index]

    if (selectedDivisionEnVolume != undefined) {
      this.getModesAlienation()
      this.modificationDivisionEnVolumeForm.patchValue(selectedDivisionEnVolume)
      this.showModificationDivisionEnVolumeModal = true
    }
  }

  closeModificationDivisionEnVolumeModal(): void {
    this.showModificationDivisionEnVolumeModal = false
    this.modificationDivisionEnVolumeForm.reset()
  }

  openSuppressionDivisionEnVolumeModal(index: number): void {
    const selectedDivisionEnVolume: DivisionEnVolume | undefined = this.listeDivisionsEnVolumes.data[index]

    if (selectedDivisionEnVolume != undefined) {
      this.suppressionDivisionEnVolumeForm.get('id')?.setValue(selectedDivisionEnVolume.id)

      this.showSuppressionDivisionEnVolumeModal = true
    }
  }

  closeSuppressionDivisionEnVolumeModal(): void {
    this.showSuppressionDivisionEnVolumeModal = false
    this.suppressionDivisionEnVolumeForm.reset()
  }

  // Utils
  getValeurContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): string {
    return ContenanceUtils.getInstance().getValeurContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }

  getSuperficieContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): number {
    return ContenanceUtils.getInstance().getSuperficieContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }

}
