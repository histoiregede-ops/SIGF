import { Component } from '@angular/core';
import { Paiement } from '../../../../../data/modules/gestion-dossiers/models/Paiement';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Canton } from '../../../../../data/modules/commun/models/Canton';
import { CantonService } from '../../../../../data/modules/commun/services/canton.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { PaiementService } from '../../../../../data/modules/gestion-dossiers/services/paiement.service';

@Component({
  selector: 'app-liste-paiements-page',
  templateUrl: './liste-paiements-page.component.html',
  styleUrl: './liste-paiements-page.component.scss'
})
export class ListePaiementsPageComponent {
  
  showNouveauPaiementModal: boolean = false
  showModificationPaiementModal: boolean = false
  showSuppressionPaiementModal: boolean = false

  listePaiements: PagingData<Paiement> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  cantons: Canton[] = []

  masquerfiltresListePaiements: boolean = false
  filtresListePaiementsForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    canton: new FormControl(null, []),
  })

  nouveauPaiementForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    cantonId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationPaiementForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    cantonId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionPaiementForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private paiementService: PaiementService,
    private cantonService: CantonService,
  ) {
    this.getPaiements()
    this.getCantons()
  }

  getPaiements(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListePaiementsForm.value)

    this.paiementService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Paiement>) => {
          console.log(value)
          this.listePaiements = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des paiements' })
        }
      })
  }

  getCantons(): void {
    this.cantonService.getAllData()
      .subscribe({
        next: (value: Canton[]) => {
          this.cantons = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des cantons' })
        }
      })
  }

  annulerRecherchePaiement(): void {
    this.filtresListePaiementsForm.get('search')!.setValue(null)
    this.filtrerListePaiements()
  }

  filtrerListePaiements(page?: number, paginationSize?: number): void {
    this.getPaiements({ page: this.listePaiements.currentPage, paginationSize: this.listePaiements.paginationSize! })
  }

  effacerFiltresListePaiements(): void {
    this.filtresListePaiementsForm.reset()

    this.filtrerListePaiements()
  }

  validerCreationPaiement(): void {
    this.nouveauPaiementForm.markAllAsTouched()
    // console.log(this.nouveauPaiementForm.value)
    if (this.nouveauPaiementForm.valid) {
      let paiement: Paiement = this.nouveauPaiementForm.value

      this.paiementService.create(paiement)
        .subscribe({
          next: (value: Paiement) => {
            this.getPaiements()
            this.closeNouveauPaiementModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce paiement a été créé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un paiement avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création du paiement' })
            }
          },
        })
    }
  }

  annulerCreationPaiement(): void {
    this.closeNouveauPaiementModal()
  }

  validerModificationPaiement(): void {
    console.log(this.modificationPaiementForm.value)
    this.modificationPaiementForm.markAllAsTouched()

    if (this.modificationPaiementForm.valid) {
      let paiement: Paiement = this.modificationPaiementForm.value

      this.paiementService.update(paiement)
        .subscribe({
          next: (value: Paiement) => {
            this.getPaiements()
            this.closeModificationPaiementModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce paiement a été mis à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un paiement avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du paiement' })
            }
          },
        })
    }
  }

  annulerModificationPaiement(): void {
    this.closeModificationPaiementModal()
  }

  validerSuppressionPaiement(): void {
    console.log(this.suppressionPaiementForm.value)
    this.suppressionPaiementForm.markAllAsTouched()

    if (this.suppressionPaiementForm.valid) {
      let paiementId: Paiement['id'] = this.suppressionPaiementForm.get('id')!.value

      this.paiementService.delete(paiementId!)
        .subscribe({
          next: (value: Paiement) => {
            this.getPaiements()
            this.closeSuppressionPaiementModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce paiement a été supprimé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression du paiement' })
          },
        })
    }
  }

  annulerSuppressionPaiement(): void {
    this.closeSuppressionPaiementModal()
  }

  // Modals
  openNouveauPaiementModal(): void {
    this.showNouveauPaiementModal = true
  }

  closeNouveauPaiementModal(): void {
    this.showNouveauPaiementModal = false
    this.nouveauPaiementForm.reset()
  }

  openModificationPaiementModal(index: number): void {
    const selectedPaiement: Paiement | undefined = this.listePaiements.data[index]

    if (selectedPaiement != undefined) {
      this.getCantons()
      this.modificationPaiementForm.get('id')?.setValue(selectedPaiement.id)
      this.modificationPaiementForm.get('libelle')?.setValue(selectedPaiement.libelle)
      this.modificationPaiementForm.get('cantonId')?.setValue(selectedPaiement.cantonId)
      this.modificationPaiementForm.get('description')?.setValue(selectedPaiement.description)

      this.showModificationPaiementModal = true
    }
  }

  closeModificationPaiementModal(): void {
    this.showModificationPaiementModal = false
    this.modificationPaiementForm.reset()
  }

  openSuppressionPaiementModal(index: number): void {
    const selectedPaiement: Paiement | undefined = this.listePaiements.data[index]

    if (selectedPaiement != undefined) {
      this.suppressionPaiementForm.get('id')?.setValue(selectedPaiement.id)

      this.showSuppressionPaiementModal = true
    }
  }

  closeSuppressionPaiementModal(): void {
    this.showSuppressionPaiementModal = false
    this.suppressionPaiementForm.reset()
  }


}
