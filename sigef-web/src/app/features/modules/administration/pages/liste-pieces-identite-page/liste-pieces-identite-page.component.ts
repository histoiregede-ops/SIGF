import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { PieceIdentite } from '../../../../../data/modules/commun/models/PieceIdentite';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { PieceIdentiteService } from '../../../../../data/modules/commun/services/piece-identite.service';
import { CategoriesPieceIdentite } from '../../../../../data/enums/CategoriesPieceIdentite';

@Component({
  selector: 'app-liste-pieces-identite-page',
  templateUrl: './liste-pieces-identite-page.component.html',
  styleUrl: './liste-pieces-identite-page.component.scss'
})
export class ListePiecesIdentitePageComponent {

  showNouvellePieceIdentiteModal: boolean = false
  showModificationPieceIdentiteModal: boolean = false
  showSuppressionPieceIdentiteModal: boolean = false

  listePiecesIdentite: PagingData<PieceIdentite> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListePiecesIdentite: boolean = false
  filtresListePiecesIdentiteForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    categorie: new FormControl(null, []),
  })

  nouvellePieceIdentiteForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
    categorie: new FormControl(null, []),
  })

  modificationPieceIdentiteForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
    categorie: new FormControl(null, []),
  })

  suppressionPieceIdentiteForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  readonly categoriesPieceIdentite = CategoriesPieceIdentite

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private pieceIdentiteService: PieceIdentiteService,
  ) {
    this.getPiecesIdentite()
  }

  getPiecesIdentite(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListePiecesIdentiteForm.value)

    this.pieceIdentiteService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<PieceIdentite>) => {
          console.log(value)
          this.listePiecesIdentite = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des PiecesIdentite' })
        }
      })
  }

  annulerRecherchePieceIdentite(): void {
    this.filtresListePiecesIdentiteForm.get('search')!.setValue(null)
    this.filtrerListePiecesIdentite()
  }

  filtrerListePiecesIdentite(page?: number, paginationSize?: number): void {
    this.getPiecesIdentite({ page: this.listePiecesIdentite.currentPage, paginationSize: this.listePiecesIdentite.paginationSize! })
  }

  effacerFiltresListePiecesIdentite(): void {
    this.filtresListePiecesIdentiteForm.reset()

    this.filtrerListePiecesIdentite()
  }

  validerCreationPieceIdentite(): void {
    this.nouvellePieceIdentiteForm.markAllAsTouched()
    // console.log(this.nouvellePieceIdentiteForm.value)
    if (this.nouvellePieceIdentiteForm.valid) {
      let pieceIdentite: PieceIdentite = this.nouvellePieceIdentiteForm.value

      this.pieceIdentiteService.create(pieceIdentite)
        .subscribe({
          next: (value: PieceIdentite) => {
            this.getPiecesIdentite()
            this.closeNouvellePieceIdentiteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette pieceIdentite a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if (err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une pieceIdentite avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de la pieceIdentite' })
            }
          },
        })
    }
  }

  annulerCreationPieceIdentite(): void {
    this.closeNouvellePieceIdentiteModal()
  }

  validerModificationPieceIdentite(): void {
    console.log(this.modificationPieceIdentiteForm.value)
    this.modificationPieceIdentiteForm.markAllAsTouched()

    if (this.modificationPieceIdentiteForm.valid) {
      let pieceIdentite: PieceIdentite = this.modificationPieceIdentiteForm.value

      this.pieceIdentiteService.update(pieceIdentite)
        .subscribe({
          next: (value: PieceIdentite) => {
            this.getPiecesIdentite()
            this.closeModificationPieceIdentiteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette pieceIdentite a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if (err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une pieceIdentite avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la pieceIdentite' })
            }
          },
        })
    }
  }

  annulerModificationPieceIdentite(): void {
    this.closeModificationPieceIdentiteModal()
  }

  validerSuppressionPieceIdentite(): void {
    console.log(this.suppressionPieceIdentiteForm.value)
    this.suppressionPieceIdentiteForm.markAllAsTouched()

    if (this.suppressionPieceIdentiteForm.valid) {
      let pieceIdentiteId: PieceIdentite['id'] = this.suppressionPieceIdentiteForm.get('id')!.value

      this.pieceIdentiteService.delete(pieceIdentiteId!)
        .subscribe({
          next: (value: PieceIdentite) => {
            this.getPiecesIdentite()
            this.closeSuppressionPieceIdentiteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette pieceIdentite a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la pieceIdentite' })
          },
        })
    }
  }

  annulerSuppressionPieceIdentite(): void {
    this.closeSuppressionPieceIdentiteModal()
  }

  // Modals
  openNouvellePieceIdentiteModal(): void {
    this.showNouvellePieceIdentiteModal = true
  }

  closeNouvellePieceIdentiteModal(): void {
    this.showNouvellePieceIdentiteModal = false
    this.nouvellePieceIdentiteForm.reset()
  }

  openModificationPieceIdentiteModal(index: number): void {
    const selectedPieceIdentite: PieceIdentite | undefined = this.listePiecesIdentite.data[index]

    if (selectedPieceIdentite != undefined) {
      this.getPiecesIdentite()
      this.modificationPieceIdentiteForm.get('id')?.setValue(selectedPieceIdentite.id)
      this.modificationPieceIdentiteForm.get('libelle')?.setValue(selectedPieceIdentite.libelle)
      this.modificationPieceIdentiteForm.get('description')?.setValue(selectedPieceIdentite.description)
      this.modificationPieceIdentiteForm.get('categorie')?.setValue(selectedPieceIdentite.categorie)

      this.showModificationPieceIdentiteModal = true
    }
  }

  closeModificationPieceIdentiteModal(): void {
    this.showModificationPieceIdentiteModal = false
    this.modificationPieceIdentiteForm.reset()
  }

  openSuppressionPieceIdentiteModal(index: number): void {
    const selectedPieceIdentite: PieceIdentite | undefined = this.listePiecesIdentite.data[index]

    if (selectedPieceIdentite != undefined) {
      this.suppressionPieceIdentiteForm.get('id')?.setValue(selectedPieceIdentite.id)

      this.showSuppressionPieceIdentiteModal = true
    }
  }

  closeSuppressionPieceIdentiteModal(): void {
    this.showSuppressionPieceIdentiteModal = false
    this.suppressionPieceIdentiteForm.reset()
  }

}
