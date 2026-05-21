import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { FormeJuridique } from '../../../../../data/modules/commun/models/FormeJuridique';
import { FormeJuridiqueService } from '../../../../../data/modules/commun/services/forme-juridique.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-formes-juridiques-page',
  templateUrl: './liste-formes-juridiques-page.component.html',
  styleUrl: './liste-formes-juridiques-page.component.scss'
})
export class ListeFormesJuridiquesPageComponent {

  showNouvelleFormeJuridiqueModal: boolean = false
  showModificationFormeJuridiqueModal: boolean = false
  showSuppressionFormeJuridiqueModal: boolean = false

  listeFormesJuridique: PagingData<FormeJuridique> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListeFormesJuridique: boolean = false
  filtresListeFormesJuridiqueForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    declaree: new FormControl(null, []),
  })

  nouvelleFormeJuridiqueForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    declaree: new FormControl(true, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationFormeJuridiqueForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    declaree: new FormControl(true, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionFormeJuridiqueForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private formeJuridiqueService: FormeJuridiqueService,
  ) {
    this.getFormesJuridique()
  }

  getFormesJuridique(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeFormesJuridiqueForm.value)

    this.formeJuridiqueService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<FormeJuridique>) => {
          console.log(value)
          this.listeFormesJuridique = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des formes juridiques' })
        }
      })
  }

  annulerRechercheFormeJuridique(): void {
    this.filtresListeFormesJuridiqueForm.get('search')!.setValue(null)
    this.filtrerListeFormesJuridique()
  }

  filtrerListeFormesJuridique(page?: number, paginationSize?: number): void {
    this.getFormesJuridique({ page: this.listeFormesJuridique.currentPage, paginationSize: this.listeFormesJuridique.paginationSize! })
  }

  effacerFiltresListeFormesJuridique(): void {
    this.filtresListeFormesJuridiqueForm.reset()

    this.filtrerListeFormesJuridique()
  }

  validerCreationFormeJuridique(): void {
    this.nouvelleFormeJuridiqueForm.markAllAsTouched()
    // console.log(this.nouvelleFormeJuridiqueForm.value)
    if (this.nouvelleFormeJuridiqueForm.valid) {
      let formeJuridique: FormeJuridique = this.nouvelleFormeJuridiqueForm.value

      this.formeJuridiqueService.create(formeJuridique)
        .subscribe({
          next: (value: FormeJuridique) => {
            this.getFormesJuridique()
            this.closeNouvelleFormeJuridiqueModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette forme juridique a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une forme juridique avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de la forme juridique' })
            }
          },
        })
    }
  }

  annulerCreationFormeJuridique(): void {
    this.closeNouvelleFormeJuridiqueModal()
  }

  validerModificationFormeJuridique(): void {
    console.log(this.modificationFormeJuridiqueForm.value)
    this.modificationFormeJuridiqueForm.markAllAsTouched()

    if (this.modificationFormeJuridiqueForm.valid) {
      let formeJuridique: FormeJuridique = this.modificationFormeJuridiqueForm.value

      this.formeJuridiqueService.update(formeJuridique)
        .subscribe({
          next: (value: FormeJuridique) => {
            this.getFormesJuridique()
            this.closeModificationFormeJuridiqueModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette forme juridique a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une forme juridique avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la forme juridique' })
            }
          },
        })
    }
  }

  annulerModificationFormeJuridique(): void {
    this.closeModificationFormeJuridiqueModal()
  }

  validerSuppressionFormeJuridique(): void {
    console.log(this.suppressionFormeJuridiqueForm.value)
    this.suppressionFormeJuridiqueForm.markAllAsTouched()

    if (this.suppressionFormeJuridiqueForm.valid) {
      let formeJuridiqueId: FormeJuridique['id'] = this.suppressionFormeJuridiqueForm.get('id')!.value

      this.formeJuridiqueService.delete(formeJuridiqueId!)
        .subscribe({
          next: (value: FormeJuridique) => {
            this.getFormesJuridique()
            this.closeSuppressionFormeJuridiqueModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette forme juridique a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la forme juridique' })
          },
        })
    }
  }

  annulerSuppressionFormeJuridique(): void {
    this.closeSuppressionFormeJuridiqueModal()
  }

  // Modals
  openNouvelleFormeJuridiqueModal(): void {
    this.showNouvelleFormeJuridiqueModal = true
  }

  closeNouvelleFormeJuridiqueModal(): void {
    this.showNouvelleFormeJuridiqueModal = false
    this.nouvelleFormeJuridiqueForm.reset()
  }

  openModificationFormeJuridiqueModal(index: number): void {
    const selectedFormeJuridique: FormeJuridique | undefined = this.listeFormesJuridique.data[index]

    if (selectedFormeJuridique != undefined) {
      this.modificationFormeJuridiqueForm.get('id')?.setValue(selectedFormeJuridique.id)
      this.modificationFormeJuridiqueForm.get('libelle')?.setValue(selectedFormeJuridique.libelle)
      this.modificationFormeJuridiqueForm.get('declaree')?.setValue(selectedFormeJuridique.declaree)
      this.modificationFormeJuridiqueForm.get('description')?.setValue(selectedFormeJuridique.description)

      this.showModificationFormeJuridiqueModal = true
    }
  }

  closeModificationFormeJuridiqueModal(): void {
    this.showModificationFormeJuridiqueModal = false
    this.modificationFormeJuridiqueForm.reset()
  }

  openSuppressionFormeJuridiqueModal(index: number): void {
    const selectedFormeJuridique: FormeJuridique | undefined = this.listeFormesJuridique.data[index]

    if (selectedFormeJuridique != undefined) {
      this.suppressionFormeJuridiqueForm.get('id')?.setValue(selectedFormeJuridique.id)

      this.showSuppressionFormeJuridiqueModal = true
    }
  }

  closeSuppressionFormeJuridiqueModal(): void {
    this.showSuppressionFormeJuridiqueModal = false
    this.suppressionFormeJuridiqueForm.reset()
  }

}
