import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { DivisionEnLot } from '../../../../../data/modules/gestion-dossiers/models/DivisionEnLot';
import { ModeAlienation } from '../../../../../data/modules/gestion-dossiers/models/ModeAlienation';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { DivisionEnLotService } from '../../../../../data/modules/gestion-dossiers/services/division-en-lot.service';
import { ModeAlienationService } from '../../../../../data/modules/gestion-dossiers/services/mode-alienation.service';
import { ContenanceUtils } from '../../../../../data/utils/ContenanceUtils';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-section-divisions-en-lots-titre-foncier',
  templateUrl: './section-divisions-en-lots-titre-foncier.component.html',
  styleUrl: './section-divisions-en-lots-titre-foncier.component.scss'
})
export class SectionDivisionsEnLotsTitreFoncierComponent implements OnChanges {

  @Input() titreFoncier?: TitreFoncier

  modesAlienation: ModeAlienation[] = []

  showNouvelleDivisionEnLotModal: boolean = false
  showModificationDivisionEnLotModal: boolean = false
  showSuppressionDivisionEnLotModal: boolean = false

  listeDivisionsEnLots: PagingData<DivisionEnLot> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  filtresListeDivisionsEnLotsForm: FormGroup = new FormGroup({
    titreFoncierId: new FormControl(null, [Validators.required]),
    search: new FormControl(null, []),
    mode: new FormControl(null, []),
  })

  nouvelleDivisionEnLotForm: FormGroup = new FormGroup({
    numeroLotOuVolume: new FormControl(null, [Validators.required]),
    situationBatiment: new FormControl(null, [Validators.required]),
    situationNiveau: new FormControl(null, [Validators.required]),
    natureDescription: new FormControl(null, [Validators.required]),
    affectation: new FormControl(null, [Validators.required]),
    contenance: new FormControl(null, [Validators.required]),
    quotePartPartiesCommunes: new FormControl(null, [Validators.required]),
    valeurLot: new FormControl(null, [Validators.required]),
    mutationTitreFoncier: new FormControl(null, [Validators.required]),
    extinctionLot: new FormControl(null, [Validators.required]),
    modeAlienationId: new FormControl(null, [Validators.required]),
  })

  modificationDivisionEnLotForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    numeroLot: new FormControl(null, [Validators.required]),
    numeroLotOuVolume: new FormControl(null, [Validators.required]),
    situationBatiment: new FormControl(null, [Validators.required]),
    situationNiveau: new FormControl(null, [Validators.required]),
    natureDescription: new FormControl(null, [Validators.required]),
    affectation: new FormControl(null, [Validators.required]),
    contenance: new FormControl(null, [Validators.required]),
    quotePartPartiesCommunes: new FormControl(null, [Validators.required]),
    valeurLot: new FormControl(null, [Validators.required]),
    mutationTitreFoncier: new FormControl(null, [Validators.required]),
    extinctionLot: new FormControl(null, [Validators.required]),
    modeAlienationId: new FormControl(null, [Validators.required]),
  })

  suppressionDivisionEnLotForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private notificationsHandlerService: NotificationsHandlerService,
    private modeAlienationService: ModeAlienationService,
    private divisionEnLotService: DivisionEnLotService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['titreFoncier'].previousValue != changes['titreFoncier'].currentValue) {
      if (this.titreFoncier) {
        this.filtresListeDivisionsEnLotsForm.get('titreFoncierId')!.setValue(this.titreFoncier.id)
        this.getDivisionsEnLots()
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

  getDivisionsEnLots(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    if (this.filtresListeDivisionsEnLotsForm.valid) {
      const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeDivisionsEnLotsForm.value)

      this.divisionEnLotService.getAll(event.page, event.paginationSize, filtres)
        .subscribe({
          next: (value: PagingData<DivisionEnLot>) => {
            console.log("DivisionEnLot: ", value)
            this.listeDivisionsEnLots = value
          },
          error: (err: HttpErrorResponse) => {
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des divisions en lots' })
          }
        })
    }
    else {
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des divisions en lots' })
    }

  }

  filtrerListeDivisionsEnLots(): void {
    // console.log(this.filtresListeDivisionsEnLotsForm.value)
    this.getDivisionsEnLots({ page: this.listeDivisionsEnLots.currentPage, paginationSize: this.listeDivisionsEnLots.paginationSize! })
  }

  effacerFiltresListeDivisionsEnLots(): void {
    this.filtresListeDivisionsEnLotsForm.reset()

    this.filtrerListeDivisionsEnLots()
  }

  validerCreationDivisionEnLot(): void {
    this.nouvelleDivisionEnLotForm.markAllAsTouched()
    // console.log(this.nouvelleDivisionEnLotForm.value)
    if (this.nouvelleDivisionEnLotForm.valid && this.titreFoncier) {
      let divisionEnLot: DivisionEnLot = this.nouvelleDivisionEnLotForm.value
      divisionEnLot.titreFoncierId = this.titreFoncier.id

      this.divisionEnLotService.create(divisionEnLot)
        .subscribe({
          next: (value: DivisionEnLot) => {
            this.getDivisionsEnLots()
            this.closeNouvelleDivisionEnLotModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette division en lot a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerCreationDivisionEnLot(): void {
    this.closeNouvelleDivisionEnLotModal()
  }

  validerModificationDivisionEnLot(): void {
    console.log(this.modificationDivisionEnLotForm.value)
    this.modificationDivisionEnLotForm.markAllAsTouched()

    if (this.modificationDivisionEnLotForm.valid) {
      let divisionEnLot: DivisionEnLot = this.modificationDivisionEnLotForm.value

      this.divisionEnLotService.update(divisionEnLot)
        .subscribe({
          next: (value: DivisionEnLot) => {
            this.getDivisionsEnLots()
            this.closeModificationDivisionEnLotModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette division en lot a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerModificationDivisionEnLot(): void {
    this.closeModificationDivisionEnLotModal()
  }

  validerSuppressionDivisionEnLot(): void {
    console.log(this.suppressionDivisionEnLotForm.value)
    this.suppressionDivisionEnLotForm.markAllAsTouched()

    if (this.suppressionDivisionEnLotForm.valid) {
      let divisionEnLotId: DivisionEnLot['id'] = this.suppressionDivisionEnLotForm.get('id')!.value

      this.divisionEnLotService.delete(divisionEnLotId!)
        .subscribe({
          next: (value: DivisionEnLot) => {
            this.getDivisionsEnLots()
            this.closeSuppressionDivisionEnLotModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette division en lot a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la région' })
          },
        })
    }
  }

  annulerSuppressionDivisionEnLot(): void {
    this.closeSuppressionDivisionEnLotModal()
  }

  // Modals
  openNouvelleDivisionEnLotModal(): void {
    this.showNouvelleDivisionEnLotModal = true
  }

  closeNouvelleDivisionEnLotModal(): void {
    this.showNouvelleDivisionEnLotModal = false
    this.nouvelleDivisionEnLotForm.reset()
  }

  openModificationDivisionEnLotModal(index: number): void {
    const selectedDivisionEnLot: DivisionEnLot | undefined = this.listeDivisionsEnLots.data[index]

    if (selectedDivisionEnLot != undefined) {
      this.getModesAlienation()
      this.modificationDivisionEnLotForm.patchValue(selectedDivisionEnLot)
      this.showModificationDivisionEnLotModal = true
    }
  }

  closeModificationDivisionEnLotModal(): void {
    this.showModificationDivisionEnLotModal = false
    this.modificationDivisionEnLotForm.reset()
  }

  openSuppressionDivisionEnLotModal(index: number): void {
    const selectedDivisionEnLot: DivisionEnLot | undefined = this.listeDivisionsEnLots.data[index]

    if (selectedDivisionEnLot != undefined) {
      this.suppressionDivisionEnLotForm.get('id')?.setValue(selectedDivisionEnLot.id)

      this.showSuppressionDivisionEnLotModal = true
    }
  }

  closeSuppressionDivisionEnLotModal(): void {
    this.showSuppressionDivisionEnLotModal = false
    this.suppressionDivisionEnLotForm.reset()
  }

  // Utils
  getValeurContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): string {
    return ContenanceUtils.getInstance().getValeurContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }

  getSuperficieContenance(contenanceEnHectare: number | undefined, contenanceEnAre: number | undefined, contenanceEnCentiare: number | undefined): number {
    return ContenanceUtils.getInstance().getSuperficieContenance(contenanceEnHectare, contenanceEnAre, contenanceEnCentiare)
  }

}
