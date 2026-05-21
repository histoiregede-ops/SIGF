import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Periode } from '../../../../../data/modules/commun/models/Periode';
import { PeriodeService } from '../../../../../data/modules/commun/services/periode.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-periodes-page',
  templateUrl: './liste-periodes-page.component.html',
  styleUrl: './liste-periodes-page.component.scss'
})
export class ListePeriodesPageComponent {

  showNouvellePeriodeModal: boolean = false
  showModificationPeriodeModal: boolean = false
  showSuppressionPeriodeModal: boolean = false

  listePeriodes: PagingData<Periode> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListePeriodes: boolean = false
  filtresListePeriodesForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
  })

  nouvellePeriodeForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    sigle: new FormControl(null, []),
    description: new FormControl(null, []),
  })

  modificationPeriodeForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    sigle: new FormControl(null, []),
    description: new FormControl(null, []),
  })

  suppressionPeriodeForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private periodeService: PeriodeService,
  ) {
    this.getPeriodes()
  }

  getPeriodes(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListePeriodesForm.value)

    this.periodeService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Periode>) => {
          console.log(value)
          this.listePeriodes = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des périodes' })
        }
      })
  }

  annulerRecherchePeriode(): void {
    this.filtresListePeriodesForm.get('search')!.setValue(null)
    this.filtrerListePeriodes()
  }

  filtrerListePeriodes(page?: number, paginationSize?: number): void {
    this.getPeriodes({ page: this.listePeriodes.currentPage, paginationSize: this.listePeriodes.paginationSize! })
  }

  effacerFiltresListePeriodes(): void {
    this.filtresListePeriodesForm.reset()

    this.filtrerListePeriodes()
  }

  validerCreationPeriode(): void {
    this.nouvellePeriodeForm.markAllAsTouched()
    // console.log(this.nouvellePeriodeForm.value)
    if (this.nouvellePeriodeForm.valid) {
      let periode: Periode = this.nouvellePeriodeForm.value

      this.periodeService.create(periode)
        .subscribe({
          next: (value: Periode) => {
            this.getPeriodes()
            this.closeNouvellePeriodeModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette periode a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if (err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une période avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de la période' })
            }
          },
        })
    }
  }

  annulerCreationPeriode(): void {
    this.closeNouvellePeriodeModal()
  }

  validerModificationPeriode(): void {
    console.log(this.modificationPeriodeForm.value)
    this.modificationPeriodeForm.markAllAsTouched()

    if (this.modificationPeriodeForm.valid) {
      let periode: Periode = this.modificationPeriodeForm.value

      this.periodeService.update(periode)
        .subscribe({
          next: (value: Periode) => {
            this.getPeriodes()
            this.closeModificationPeriodeModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette periode a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if (err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une période avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la période' })
            }
          },
        })
    }
  }

  annulerModificationPeriode(): void {
    this.closeModificationPeriodeModal()
  }

  validerSuppressionPeriode(): void {
    console.log(this.suppressionPeriodeForm.value)
    this.suppressionPeriodeForm.markAllAsTouched()

    if (this.suppressionPeriodeForm.valid) {
      let periodeId: Periode['id'] = this.suppressionPeriodeForm.get('id')!.value

      this.periodeService.delete(periodeId!)
        .subscribe({
          next: (value: Periode) => {
            this.getPeriodes()
            this.closeSuppressionPeriodeModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette periode a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la période' })
          },
        })
    }
  }

  annulerSuppressionPeriode(): void {
    this.closeSuppressionPeriodeModal()
  }

  // Modals
  openNouvellePeriodeModal(): void {
    this.showNouvellePeriodeModal = true
  }

  closeNouvellePeriodeModal(): void {
    this.showNouvellePeriodeModal = false
    this.nouvellePeriodeForm.reset()
  }

  openModificationPeriodeModal(index: number): void {
    const selectedPeriode: Periode | undefined = this.listePeriodes.data[index]

    if (selectedPeriode != undefined) {
      this.getPeriodes()
      this.modificationPeriodeForm.get('id')?.setValue(selectedPeriode.id)
      this.modificationPeriodeForm.get('libelle')?.setValue(selectedPeriode.libelle)
      this.modificationPeriodeForm.get('sigle')?.setValue(selectedPeriode.sigle)
      this.modificationPeriodeForm.get('description')?.setValue(selectedPeriode.description)

      this.showModificationPeriodeModal = true
    }
  }

  closeModificationPeriodeModal(): void {
    this.showModificationPeriodeModal = false
    this.modificationPeriodeForm.reset()
  }

  openSuppressionPeriodeModal(index: number): void {
    const selectedPeriode: Periode | undefined = this.listePeriodes.data[index]

    if (selectedPeriode != undefined) {
      this.suppressionPeriodeForm.get('id')?.setValue(selectedPeriode.id)

      this.showSuppressionPeriodeModal = true
    }
  }

  closeSuppressionPeriodeModal(): void {
    this.showSuppressionPeriodeModal = false
    this.suppressionPeriodeForm.reset()
  }
}
