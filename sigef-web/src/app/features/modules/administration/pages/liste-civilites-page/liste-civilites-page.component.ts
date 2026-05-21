import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Civilite } from '../../../../../data/modules/commun/models/Civilite';
import { CiviliteService } from '../../../../../data/modules/commun/services/civilite.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { SexesPersonnePhysique } from '../../../../../data/enums/SexesPersonnePhysique';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-civilites-page',
  templateUrl: './liste-civilites-page.component.html',
  styleUrl: './liste-civilites-page.component.scss'
})
export class ListeCivilitesPageComponent {

  showNouvelleCiviliteModal: boolean = false
  showModificationCiviliteModal: boolean = false
  showSuppressionCiviliteModal: boolean = false

  listeCivilites: PagingData<Civilite> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListeCivilites: boolean = false
  filtresListeCivilitesForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    sexe: new FormControl(null, []),
  })

  nouvelleCiviliteForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    abbreviation: new FormControl(null, [Validators.required]),
    sexe: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationCiviliteForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    abbreviation: new FormControl(null, [Validators.required]),
    sexe: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionCiviliteForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  readonly sexesPersonnePhysique = SexesPersonnePhysique

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private civiliteService: CiviliteService,
  ) {
    this.getCivilites()
  }

  getCivilites(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeCivilitesForm.value)

    this.civiliteService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Civilite>) => {
          console.log(value)
          this.listeCivilites = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des civilités' })
        }
      })
  }

  annulerRechercheCivilite(): void {
    this.filtresListeCivilitesForm.get('search')!.setValue(null)
    this.filtrerListeCivilites()
  }

  filtrerListeCivilites(page?: number, paginationSize?: number): void {
    this.getCivilites({ page: this.listeCivilites.currentPage, paginationSize: this.listeCivilites.paginationSize! })
  }

  effacerFiltresListeCivilites(): void {
    this.filtresListeCivilitesForm.reset()

    this.filtrerListeCivilites()
  }

  validerCreationCivilite(): void {
    this.nouvelleCiviliteForm.markAllAsTouched()
    // console.log(this.nouvelleCiviliteForm.value)
    if (this.nouvelleCiviliteForm.valid) {
      let civilite: Civilite = this.nouvelleCiviliteForm.value

      this.civiliteService.create(civilite)
        .subscribe({
          next: (value: Civilite) => {
            this.getCivilites()
            this.closeNouvelleCiviliteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette civilite a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if (err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une civilité avec le même libellé ou la même abbréviation existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de la civilité' })
            }
          },
        })
    }
  }

  annulerCreationCivilite(): void {
    this.closeNouvelleCiviliteModal()
  }

  validerModificationCivilite(): void {
    console.log(this.modificationCiviliteForm.value)
    this.modificationCiviliteForm.markAllAsTouched()

    if (this.modificationCiviliteForm.valid) {
      let civilite: Civilite = this.modificationCiviliteForm.value

      this.civiliteService.update(civilite)
        .subscribe({
          next: (value: Civilite) => {
            this.getCivilites()
            this.closeModificationCiviliteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette civilite a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if (err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une civilité avec le même libellé ou la même abbréviation existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la civilité' })
            }
          },
        })
    }
  }

  annulerModificationCivilite(): void {
    this.closeModificationCiviliteModal()
  }

  validerSuppressionCivilite(): void {
    console.log(this.suppressionCiviliteForm.value)
    this.suppressionCiviliteForm.markAllAsTouched()

    if (this.suppressionCiviliteForm.valid) {
      let civiliteId: Civilite['id'] = this.suppressionCiviliteForm.get('id')!.value

      this.civiliteService.delete(civiliteId!)
        .subscribe({
          next: (value: Civilite) => {
            this.getCivilites()
            this.closeSuppressionCiviliteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette civilite a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la civilité' })
          },
        })
    }
  }

  annulerSuppressionCivilite(): void {
    this.closeSuppressionCiviliteModal()
  }

  // Modals
  openNouvelleCiviliteModal(): void {
    this.showNouvelleCiviliteModal = true
  }

  closeNouvelleCiviliteModal(): void {
    this.showNouvelleCiviliteModal = false
    this.nouvelleCiviliteForm.reset()
  }

  openModificationCiviliteModal(index: number): void {
    const selectedCivilite: Civilite | undefined = this.listeCivilites.data[index]

    if (selectedCivilite != undefined) {
      this.getCivilites()
      this.modificationCiviliteForm.get('id')?.setValue(selectedCivilite.id)
      this.modificationCiviliteForm.get('libelle')?.setValue(selectedCivilite.libelle)
      this.modificationCiviliteForm.get('abbreviation')?.setValue(selectedCivilite.abbreviation)
      this.modificationCiviliteForm.get('sexe')?.setValue(selectedCivilite.sexe)
      this.modificationCiviliteForm.get('description')?.setValue(selectedCivilite.description)

      this.showModificationCiviliteModal = true
    }
  }

  closeModificationCiviliteModal(): void {
    this.showModificationCiviliteModal = false
    this.modificationCiviliteForm.reset()
  }

  openSuppressionCiviliteModal(index: number): void {
    const selectedCivilite: Civilite | undefined = this.listeCivilites.data[index]

    if (selectedCivilite != undefined) {
      this.suppressionCiviliteForm.get('id')?.setValue(selectedCivilite.id)

      this.showSuppressionCiviliteModal = true
    }
  }

  closeSuppressionCiviliteModal(): void {
    this.showSuppressionCiviliteModal = false
    this.suppressionCiviliteForm.reset()
  }

}
