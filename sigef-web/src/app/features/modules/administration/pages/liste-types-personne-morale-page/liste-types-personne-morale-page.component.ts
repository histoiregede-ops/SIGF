import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { TypePersonneMorale } from '../../../../../data/modules/commun/models/TypePersonneMorale';
import { TypePersonneMoraleService } from '../../../../../data/modules/commun/services/type-personne-morale.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-types-personne-morale-page',
  templateUrl: './liste-types-personne-morale-page.component.html',
  styleUrl: './liste-types-personne-morale-page.component.scss'
})
export class ListeTypesPersonneMoralePageComponent {

  showNouveauTypePersonneMoraleModal: boolean = false
  showModificationTypePersonneMoraleModal: boolean = false
  showSuppressionTypePersonneMoraleModal: boolean = false

  listeTypesPersonneMorale: PagingData<TypePersonneMorale> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListeTypesPersonneMorale: boolean = false
  filtresListeTypesPersonneMoraleForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
  })

  nouveauTypePersonneMoraleForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationTypePersonneMoraleForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionTypePersonneMoraleForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private typePersonneMoraleService: TypePersonneMoraleService,
  ) {
    this.getTypesPersonneMorale()
  }

  getTypesPersonneMorale(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeTypesPersonneMoraleForm.value)

    this.typePersonneMoraleService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<TypePersonneMorale>) => {
          console.log(value)
          this.listeTypesPersonneMorale = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des types de personne morale' })
        }
      })
  }

  annulerRechercheTypePersonneMorale(): void {
    this.filtresListeTypesPersonneMoraleForm.get('search')!.setValue(null)
    this.filtrerListeTypesPersonneMorale()
  }

  filtrerListeTypesPersonneMorale(page?: number, paginationSize?: number): void {
    this.getTypesPersonneMorale({ page: this.listeTypesPersonneMorale.currentPage, paginationSize: this.listeTypesPersonneMorale.paginationSize! })
  }

  effacerFiltresListeTypesPersonneMorale(): void {
    this.filtresListeTypesPersonneMoraleForm.reset()

    this.filtrerListeTypesPersonneMorale()
  }

  validerCreationTypePersonneMorale(): void {
    this.nouveauTypePersonneMoraleForm.markAllAsTouched()
    // console.log(this.nouveauTypePersonneMoraleForm.value)
    if (this.nouveauTypePersonneMoraleForm.valid) {
      let typePersonneMorale: TypePersonneMorale = this.nouveauTypePersonneMoraleForm.value

      this.typePersonneMoraleService.create(typePersonneMorale)
        .subscribe({
          next: (value: TypePersonneMorale) => {
            this.getTypesPersonneMorale()
            this.closeNouveauTypePersonneMoraleModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce type de personne morale a été créé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une type de personne morale avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création du type de personne morale' })
            }
          },
        })
    }
  }

  annulerCreationTypePersonneMorale(): void {
    this.closeNouveauTypePersonneMoraleModal()
  }

  validerModificationTypePersonneMorale(): void {
    console.log(this.modificationTypePersonneMoraleForm.value)
    this.modificationTypePersonneMoraleForm.markAllAsTouched()

    if (this.modificationTypePersonneMoraleForm.valid) {
      let typePersonneMorale: TypePersonneMorale = this.modificationTypePersonneMoraleForm.value

      this.typePersonneMoraleService.update(typePersonneMorale)
        .subscribe({
          next: (value: TypePersonneMorale) => {
            this.getTypesPersonneMorale()
            this.closeModificationTypePersonneMoraleModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce type de personne morale a été mis à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une type de personne morale avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du type de personne morale' })
            }
          },
        })
    }
  }

  annulerModificationTypePersonneMorale(): void {
    this.closeModificationTypePersonneMoraleModal()
  }

  validerSuppressionTypePersonneMorale(): void {
    console.log(this.suppressionTypePersonneMoraleForm.value)
    this.suppressionTypePersonneMoraleForm.markAllAsTouched()

    if (this.suppressionTypePersonneMoraleForm.valid) {
      let typePersonneMoraleId: TypePersonneMorale['id'] = this.suppressionTypePersonneMoraleForm.get('id')!.value

      this.typePersonneMoraleService.delete(typePersonneMoraleId!)
        .subscribe({
          next: (value: TypePersonneMorale) => {
            this.getTypesPersonneMorale()
            this.closeSuppressionTypePersonneMoraleModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce type de personne morale a été supprimé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression du type de personne morale' })
          },
        })
    }
  }

  annulerSuppressionTypePersonneMorale(): void {
    this.closeSuppressionTypePersonneMoraleModal()
  }

  // Modals
  openNouveauTypePersonneMoraleModal(): void {
    this.showNouveauTypePersonneMoraleModal = true
  }

  closeNouveauTypePersonneMoraleModal(): void {
    this.showNouveauTypePersonneMoraleModal = false
    this.nouveauTypePersonneMoraleForm.reset()
  }

  openModificationTypePersonneMoraleModal(index: number): void {
    const selectedTypePersonneMorale: TypePersonneMorale | undefined = this.listeTypesPersonneMorale.data[index]

    if (selectedTypePersonneMorale != undefined) {
      this.modificationTypePersonneMoraleForm.get('id')?.setValue(selectedTypePersonneMorale.id)
      this.modificationTypePersonneMoraleForm.get('libelle')?.setValue(selectedTypePersonneMorale.libelle)
      this.modificationTypePersonneMoraleForm.get('description')?.setValue(selectedTypePersonneMorale.description)

      this.showModificationTypePersonneMoraleModal = true
    }
  }

  closeModificationTypePersonneMoraleModal(): void {
    this.showModificationTypePersonneMoraleModal = false
    this.modificationTypePersonneMoraleForm.reset()
  }

  openSuppressionTypePersonneMoraleModal(index: number): void {
    const selectedTypePersonneMorale: TypePersonneMorale | undefined = this.listeTypesPersonneMorale.data[index]

    if (selectedTypePersonneMorale != undefined) {
      this.suppressionTypePersonneMoraleForm.get('id')?.setValue(selectedTypePersonneMorale.id)

      this.showSuppressionTypePersonneMoraleModal = true
    }
  }

  closeSuppressionTypePersonneMoraleModal(): void {
    this.showSuppressionTypePersonneMoraleModal = false
    this.suppressionTypePersonneMoraleForm.reset()
  }

}
