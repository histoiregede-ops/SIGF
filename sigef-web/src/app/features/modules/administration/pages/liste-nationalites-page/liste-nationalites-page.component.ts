import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { SexesPersonnePhysique } from '../../../../../data/enums/SexesPersonnePhysique';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Nationalite } from '../../../../../data/modules/commun/models/Nationalite';
import { NationaliteService } from '../../../../../data/modules/commun/services/nationalite.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-nationalites-page',
  templateUrl: './liste-nationalites-page.component.html',
  styleUrl: './liste-nationalites-page.component.scss'
})
export class ListeNationalitesPageComponent {

  showNouvelleNationaliteModal: boolean = false
  showModificationNationaliteModal: boolean = false
  showSuppressionNationaliteModal: boolean = false

  listeNationalites: PagingData<Nationalite> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListeNationalites: boolean = false
  filtresListeNationalitesForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
  })

  nouvelleNationaliteForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    pays: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationNationaliteForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    pays: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionNationaliteForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  readonly sexesPersonnePhysique = SexesPersonnePhysique

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private nationaliteService: NationaliteService,
  ) {
    this.getNationalites()
  }

  getNationalites(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeNationalitesForm.value)

    this.nationaliteService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Nationalite>) => {
          console.log(value)
          this.listeNationalites = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des nationalités' })
        }
      })
  }

  annulerRechercheNationalite(): void {
    this.filtresListeNationalitesForm.get('search')!.setValue(null)
    this.filtrerListeNationalites()
  }

  filtrerListeNationalites(page?: number, paginationSize?: number): void {
    this.getNationalites({ page: this.listeNationalites.currentPage, paginationSize: this.listeNationalites.paginationSize! })
  }

  effacerFiltresListeNationalites(): void {
    this.filtresListeNationalitesForm.reset()

    this.filtrerListeNationalites()
  }

  validerCreationNationalite(): void {
    this.nouvelleNationaliteForm.markAllAsTouched()
    // console.log(this.nouvelleNationaliteForm.value)
    if (this.nouvelleNationaliteForm.valid) {
      let nationalite: Nationalite = this.nouvelleNationaliteForm.value

      this.nationaliteService.create(nationalite)
        .subscribe({
          next: (value: Nationalite) => {
            this.getNationalites()
            this.closeNouvelleNationaliteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette nationalite a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if (err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une nationalité avec le même libellé ou le même pays existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de la nationalité' })
            }
          },
        })
    }
  }

  annulerCreationNationalite(): void {
    this.closeNouvelleNationaliteModal()
  }

  validerModificationNationalite(): void {
    console.log(this.modificationNationaliteForm.value)
    this.modificationNationaliteForm.markAllAsTouched()

    if (this.modificationNationaliteForm.valid) {
      let nationalite: Nationalite = this.modificationNationaliteForm.value

      this.nationaliteService.update(nationalite)
        .subscribe({
          next: (value: Nationalite) => {
            this.getNationalites()
            this.closeModificationNationaliteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette nationalite a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if (err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une nationalité avec le même libellé ou le même pays existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la nationalité' })
            }
          },
        })
    }
  }

  annulerModificationNationalite(): void {
    this.closeModificationNationaliteModal()
  }

  validerSuppressionNationalite(): void {
    console.log(this.suppressionNationaliteForm.value)
    this.suppressionNationaliteForm.markAllAsTouched()

    if (this.suppressionNationaliteForm.valid) {
      let nationaliteId: Nationalite['id'] = this.suppressionNationaliteForm.get('id')!.value

      this.nationaliteService.delete(nationaliteId!)
        .subscribe({
          next: (value: Nationalite) => {
            this.getNationalites()
            this.closeSuppressionNationaliteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette nationalite a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la nationalité' })
          },
        })
    }
  }

  annulerSuppressionNationalite(): void {
    this.closeSuppressionNationaliteModal()
  }

  // Modals
  openNouvelleNationaliteModal(): void {
    this.showNouvelleNationaliteModal = true
  }

  closeNouvelleNationaliteModal(): void {
    this.showNouvelleNationaliteModal = false
    this.nouvelleNationaliteForm.reset()
  }

  openModificationNationaliteModal(index: number): void {
    const selectedNationalite: Nationalite | undefined = this.listeNationalites.data[index]

    if (selectedNationalite != undefined) {
      this.getNationalites()
      this.modificationNationaliteForm.get('id')?.setValue(selectedNationalite.id)
      this.modificationNationaliteForm.get('libelle')?.setValue(selectedNationalite.libelle)
      this.modificationNationaliteForm.get('pays')?.setValue(selectedNationalite.pays)
      this.modificationNationaliteForm.get('description')?.setValue(selectedNationalite.description)

      this.showModificationNationaliteModal = true
    }
  }

  closeModificationNationaliteModal(): void {
    this.showModificationNationaliteModal = false
    this.modificationNationaliteForm.reset()
  }

  openSuppressionNationaliteModal(index: number): void {
    const selectedNationalite: Nationalite | undefined = this.listeNationalites.data[index]

    if (selectedNationalite != undefined) {
      this.suppressionNationaliteForm.get('id')?.setValue(selectedNationalite.id)

      this.showSuppressionNationaliteModal = true
    }
  }

  closeSuppressionNationaliteModal(): void {
    this.showSuppressionNationaliteModal = false
    this.suppressionNationaliteForm.reset()
  }

}
