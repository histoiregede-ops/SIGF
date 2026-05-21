import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { QualiteDocument } from '../../../../../data/modules/commun/models/QualiteDocument';
import { QualiteDocumentService } from '../../../../../data/modules/commun/services/qualite-document.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-qualites-document-page',
  templateUrl: './liste-qualites-document-page.component.html',
  styleUrl: './liste-qualites-document-page.component.scss'
})
export class ListeQualitesDocumentPageComponent {

  showNouvelleQualiteDocumentModal: boolean = false
  showModificationQualiteDocumentModal: boolean = false
  showSuppressionQualiteDocumentModal: boolean = false

  listeQualitesDocument: PagingData<QualiteDocument> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListeQualitesDocument: boolean = false
  filtresListeQualitesDocumentForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    aSignaler: new FormControl(null, []),
  })

  nouvelleQualiteDocumentForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    aSignaler: new FormControl(true, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationQualiteDocumentForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    aSignaler: new FormControl(true, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionQualiteDocumentForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private qualiteDocumentService: QualiteDocumentService,
  ) {
    this.getQualitesDocument()
  }

  getQualitesDocument(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeQualitesDocumentForm.value)

    this.qualiteDocumentService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<QualiteDocument>) => {
          console.log(value)
          this.listeQualitesDocument = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des qualités de document' })
        }
      })
  }

  annulerRechercheQualiteDocument(): void {
    this.filtresListeQualitesDocumentForm.get('search')!.setValue(null)
    this.filtrerListeQualitesDocument()
  }

  filtrerListeQualitesDocument(page?: number, paginationSize?: number): void {
    this.getQualitesDocument({ page: this.listeQualitesDocument.currentPage, paginationSize: this.listeQualitesDocument.paginationSize! })
  }

  effacerFiltresListeQualitesDocument(): void {
    this.filtresListeQualitesDocumentForm.reset()

    this.filtrerListeQualitesDocument()
  }

  validerCreationQualiteDocument(): void {
    this.nouvelleQualiteDocumentForm.markAllAsTouched()
    // console.log(this.nouvelleQualiteDocumentForm.value)
    if (this.nouvelleQualiteDocumentForm.valid) {
      let qualiteDocument: QualiteDocument = this.nouvelleQualiteDocumentForm.value

      this.qualiteDocumentService.create(qualiteDocument)
        .subscribe({
          next: (value: QualiteDocument) => {
            this.getQualitesDocument()
            this.closeNouvelleQualiteDocumentModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette qualité de document a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une qualité de document avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de la qualité de document' })
            }
          },
        })
    }
  }

  annulerCreationQualiteDocument(): void {
    this.closeNouvelleQualiteDocumentModal()
  }

  validerModificationQualiteDocument(): void {
    console.log(this.modificationQualiteDocumentForm.value)
    this.modificationQualiteDocumentForm.markAllAsTouched()

    if (this.modificationQualiteDocumentForm.valid) {
      let qualiteDocument: QualiteDocument = this.modificationQualiteDocumentForm.value

      this.qualiteDocumentService.update(qualiteDocument)
        .subscribe({
          next: (value: QualiteDocument) => {
            this.getQualitesDocument()
            this.closeModificationQualiteDocumentModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette qualité de document a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une qualité de document avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la qualité de document' })
            }
          },
        })
    }
  }

  annulerModificationQualiteDocument(): void {
    this.closeModificationQualiteDocumentModal()
  }

  validerSuppressionQualiteDocument(): void {
    console.log(this.suppressionQualiteDocumentForm.value)
    this.suppressionQualiteDocumentForm.markAllAsTouched()

    if (this.suppressionQualiteDocumentForm.valid) {
      let qualiteDocumentId: QualiteDocument['id'] = this.suppressionQualiteDocumentForm.get('id')!.value

      this.qualiteDocumentService.delete(qualiteDocumentId!)
        .subscribe({
          next: (value: QualiteDocument) => {
            this.getQualitesDocument()
            this.closeSuppressionQualiteDocumentModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette qualité de document a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la qualité de document' })
          },
        })
    }
  }

  annulerSuppressionQualiteDocument(): void {
    this.closeSuppressionQualiteDocumentModal()
  }

  // Modals
  openNouvelleQualiteDocumentModal(): void {
    this.showNouvelleQualiteDocumentModal = true
  }

  closeNouvelleQualiteDocumentModal(): void {
    this.showNouvelleQualiteDocumentModal = false
    this.nouvelleQualiteDocumentForm.reset()
  }

  openModificationQualiteDocumentModal(index: number): void {
    const selectedQualiteDocument: QualiteDocument | undefined = this.listeQualitesDocument.data[index]

    if (selectedQualiteDocument != undefined) {
      this.modificationQualiteDocumentForm.get('id')?.setValue(selectedQualiteDocument.id)
      this.modificationQualiteDocumentForm.get('libelle')?.setValue(selectedQualiteDocument.libelle)
      this.modificationQualiteDocumentForm.get('aSignaler')?.setValue(selectedQualiteDocument.aSignaler)
      this.modificationQualiteDocumentForm.get('description')?.setValue(selectedQualiteDocument.description)

      this.showModificationQualiteDocumentModal = true
    }
  }

  closeModificationQualiteDocumentModal(): void {
    this.showModificationQualiteDocumentModal = false
    this.modificationQualiteDocumentForm.reset()
  }

  openSuppressionQualiteDocumentModal(index: number): void {
    const selectedQualiteDocument: QualiteDocument | undefined = this.listeQualitesDocument.data[index]

    if (selectedQualiteDocument != undefined) {
      this.suppressionQualiteDocumentForm.get('id')?.setValue(selectedQualiteDocument.id)

      this.showSuppressionQualiteDocumentModal = true
    }
  }

  closeSuppressionQualiteDocumentModal(): void {
    this.showSuppressionQualiteDocumentModal = false
    this.suppressionQualiteDocumentForm.reset()
  }
}
