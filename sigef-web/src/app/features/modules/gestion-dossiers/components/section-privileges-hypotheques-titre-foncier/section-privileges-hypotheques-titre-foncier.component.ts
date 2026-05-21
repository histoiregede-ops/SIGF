import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { PrivilegeHypotheque } from '../../../../../data/modules/gestion-dossiers/models/PrivilegeHypotheque';
import { TitreFoncier } from '../../../../../data/modules/gestion-dossiers/models/TitreFoncier';
import { PrivilegeHypothequeService } from '../../../../../data/modules/gestion-dossiers/services/privilege-hypotheque.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-section-privileges-hypotheques-titre-foncier',
  templateUrl: './section-privileges-hypotheques-titre-foncier.component.html',
  styleUrl: './section-privileges-hypotheques-titre-foncier.component.scss'
})
export class SectionPrivilegesHypothequesTitreFoncierComponent implements OnChanges {

  @Input() titreFoncier?: TitreFoncier

  showNouvellePrivilegeHypothequeModal: boolean = false
  showModificationPrivilegeHypothequeModal: boolean = false
  showSuppressionPrivilegeHypothequeModal: boolean = false

  listePrivilegesHypotheques: PagingData<PrivilegeHypotheque> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  filtresListePrivilegesHypothequesForm: FormGroup = new FormGroup({
    titreFoncierId: new FormControl(null, [Validators.required]),
    search: new FormControl(null, []),
    dateInscription: new FormControl(null, []),
    dateRadiation: new FormControl(null, []),
  })

  nouvellePrivilegeHypothequeForm: FormGroup = new FormGroup({
    numeroBordereauAnalytiqueConstitution: new FormControl(null, [Validators.required]),
    dateInscription: new FormControl(null, [Validators.required]),
    beneficiaire: new FormControl(null, [Validators.required]),
    designationDroitConstitue: new FormControl(null, [Validators.required]),
    montantCharge: new FormControl(null, []),
    numeroBordereauAnalytiqueRadiation: new FormControl(null, []),
    dateRadiation: new FormControl(null, []),
  })

  modificationPrivilegeHypothequeForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    numeroBordereauAnalytiqueConstitution: new FormControl(null, [Validators.required]),
    dateInscription: new FormControl(null, [Validators.required]),
    beneficiaire: new FormControl(null, [Validators.required]),
    designationDroitConstitue: new FormControl(null, [Validators.required]),
    montantCharge: new FormControl(null, []),
    numeroBordereauAnalytiqueRadiation: new FormControl(null, []),
    dateRadiation: new FormControl(null, []),
  })

  suppressionPrivilegeHypothequeForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private notificationsHandlerService: NotificationsHandlerService,
    private privilegeHypothequeService: PrivilegeHypothequeService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['titreFoncier'].previousValue != changes['titreFoncier'].currentValue) {
      if (this.titreFoncier) {
        this.filtresListePrivilegesHypothequesForm.get('titreFoncierId')!.setValue(this.titreFoncier.id)
        this.getPrivilegesHypotheques()
      }
    }
  }

  getPrivilegesHypotheques(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    if (this.filtresListePrivilegesHypothequesForm.valid) {
      const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListePrivilegesHypothequesForm.value)

      this.privilegeHypothequeService.getAll(event.page, event.paginationSize, filtres)
        .subscribe({
          next: (value: PagingData<PrivilegeHypotheque>) => {
            console.log("PrivilegeHypotheque: ", value)
            this.listePrivilegesHypotheques = value
          },
          error: (err: HttpErrorResponse) => {
            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des privilèges/hypothèques' })
          }
        })
    }
    else {
      this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des privilèges/hypothèques' })
    }

  }

  filtrerListePrivilegesHypotheques(): void {
    // console.log(this.filtresListePrivilegesHypothequesForm.value)
    this.getPrivilegesHypotheques({ page: this.listePrivilegesHypotheques.currentPage, paginationSize: this.listePrivilegesHypotheques.paginationSize! })
  }

  effacerFiltresListePrivilegesHypotheques(): void {
    this.filtresListePrivilegesHypothequesForm.reset()

    this.filtrerListePrivilegesHypotheques()
  }

  validerCreationPrivilegeHypotheque(): void {
    this.nouvellePrivilegeHypothequeForm.markAllAsTouched()
    // console.log(this.nouvellePrivilegeHypothequeForm.value)
    if (this.nouvellePrivilegeHypothequeForm.valid && this.titreFoncier) {
      let privilegeHypotheque: PrivilegeHypotheque = this.nouvellePrivilegeHypothequeForm.value
      privilegeHypotheque.titreFoncierId = this.titreFoncier.id

      this.privilegeHypothequeService.create(privilegeHypotheque)
        .subscribe({
          next: (value: PrivilegeHypotheque) => {
            this.getPrivilegesHypotheques()
            this.closeNouvellePrivilegeHypothequeModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette privilège/hypothèque a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerCreationPrivilegeHypotheque(): void {
    this.closeNouvellePrivilegeHypothequeModal()
  }

  validerModificationPrivilegeHypotheque(): void {
    console.log(this.modificationPrivilegeHypothequeForm.value)
    this.modificationPrivilegeHypothequeForm.markAllAsTouched()

    if (this.modificationPrivilegeHypothequeForm.valid) {
      let privilegeHypotheque: PrivilegeHypotheque = this.modificationPrivilegeHypothequeForm.value

      this.privilegeHypothequeService.update(privilegeHypotheque)
        .subscribe({
          next: (value: PrivilegeHypotheque) => {
            this.getPrivilegesHypotheques()
            this.closeModificationPrivilegeHypothequeModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette privilège/hypothèque a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          },
        })
    }
  }

  annulerModificationPrivilegeHypotheque(): void {
    this.closeModificationPrivilegeHypothequeModal()
  }

  validerSuppressionPrivilegeHypotheque(): void {
    console.log(this.suppressionPrivilegeHypothequeForm.value)
    this.suppressionPrivilegeHypothequeForm.markAllAsTouched()

    if (this.suppressionPrivilegeHypothequeForm.valid) {
      let privilegeHypothequeId: PrivilegeHypotheque['id'] = this.suppressionPrivilegeHypothequeForm.get('id')!.value

      this.privilegeHypothequeService.delete(privilegeHypothequeId!)
        .subscribe({
          next: (value: PrivilegeHypotheque) => {
            this.getPrivilegesHypotheques()
            this.closeSuppressionPrivilegeHypothequeModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette privilège/hypothèque a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la privilège/hypothèque' })
          },
        })
    }
  }

  annulerSuppressionPrivilegeHypotheque(): void {
    this.closeSuppressionPrivilegeHypothequeModal()
  }

  // Modals
  openNouvellePrivilegeHypothequeModal(): void {
    this.showNouvellePrivilegeHypothequeModal = true
  }

  closeNouvellePrivilegeHypothequeModal(): void {
    this.showNouvellePrivilegeHypothequeModal = false
    this.nouvellePrivilegeHypothequeForm.reset()
  }

  openModificationPrivilegeHypothequeModal(index: number): void {
    const selectedPrivilegeHypotheque: PrivilegeHypotheque | undefined = this.listePrivilegesHypotheques.data[index]

    if (selectedPrivilegeHypotheque != undefined) {
      this.modificationPrivilegeHypothequeForm.patchValue(selectedPrivilegeHypotheque)
      this.showModificationPrivilegeHypothequeModal = true
    }
  }

  closeModificationPrivilegeHypothequeModal(): void {
    this.showModificationPrivilegeHypothequeModal = false
    this.modificationPrivilegeHypothequeForm.reset()
  }

  openSuppressionPrivilegeHypothequeModal(index: number): void {
    const selectedPrivilegeHypotheque: PrivilegeHypotheque | undefined = this.listePrivilegesHypotheques.data[index]

    if (selectedPrivilegeHypotheque != undefined) {
      this.suppressionPrivilegeHypothequeForm.get('id')?.setValue(selectedPrivilegeHypotheque.id)

      this.showSuppressionPrivilegeHypothequeModal = true
    }
  }

  closeSuppressionPrivilegeHypothequeModal(): void {
    this.showSuppressionPrivilegeHypothequeModal = false
    this.suppressionPrivilegeHypothequeForm.reset()
  }

}
