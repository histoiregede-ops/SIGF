import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Canton } from '../../../../../data/modules/commun/models/Canton';
import { Commune } from '../../../../../data/modules/commun/models/Commune';
import { CantonService } from '../../../../../data/modules/commun/services/canton.service';
import { CommuneService } from '../../../../../data/modules/commun/services/commune.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-cantons-page',
  templateUrl: './liste-cantons-page.component.html',
  styleUrl: './liste-cantons-page.component.scss'
})
export class ListeCantonsPageComponent {
  
  showNouveauCantonModal: boolean = false
  showModificationCantonModal: boolean = false
  showSuppressionCantonModal: boolean = false

  listeCantons: PagingData<Canton> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  communes: Commune[] = []

  masquerfiltresListeCantons: boolean = false
  filtresListeCantonsForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    commune: new FormControl(null, []),
  })

  nouveauCantonForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    communeId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationCantonForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    communeId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionCantonForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private cantonService: CantonService,
    private communeService: CommuneService,
  ) {
    this.getCantons()
    this.getCommunes()
  }

  getCantons(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeCantonsForm.value)

    this.cantonService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Canton>) => {
          console.log(value)
          this.listeCantons = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des cantons' })
        }
      })
  }

  getCommunes(): void {
    this.communeService.getAllData()
      .subscribe({
        next: (value: Commune[]) => {
          this.communes = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des communes' })
        }
      })
  }

  annulerRechercheCanton(): void {
    this.filtresListeCantonsForm.get('search')!.setValue(null)
    this.filtrerListeCantons()
  }

  filtrerListeCantons(page?: number, paginationSize?: number): void {
    this.getCantons({ page: this.listeCantons.currentPage, paginationSize: this.listeCantons.paginationSize! })
  }

  effacerFiltresListeCantons(): void {
    this.filtresListeCantonsForm.reset()

    this.filtrerListeCantons()
  }

  validerCreationCanton(): void {
    this.nouveauCantonForm.markAllAsTouched()
    // console.log(this.nouveauCantonForm.value)
    if (this.nouveauCantonForm.valid) {
      let canton: Canton = this.nouveauCantonForm.value

      this.cantonService.create(canton)
        .subscribe({
          next: (value: Canton) => {
            this.getCantons()
            this.closeNouveauCantonModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce canton a été créé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un canton avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création du canton' })
            }
          },
        })
    }
  }

  annulerCreationCanton(): void {
    this.closeNouveauCantonModal()
  }

  validerModificationCanton(): void {
    console.log(this.modificationCantonForm.value)
    this.modificationCantonForm.markAllAsTouched()

    if (this.modificationCantonForm.valid) {
      let canton: Canton = this.modificationCantonForm.value

      this.cantonService.update(canton)
        .subscribe({
          next: (value: Canton) => {
            this.getCantons()
            this.closeModificationCantonModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce canton a été mis à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un canton avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du canton' })
            }
          },
        })
    }
  }

  annulerModificationCanton(): void {
    this.closeModificationCantonModal()
  }

  validerSuppressionCanton(): void {
    console.log(this.suppressionCantonForm.value)
    this.suppressionCantonForm.markAllAsTouched()

    if (this.suppressionCantonForm.valid) {
      let cantonId: Canton['id'] = this.suppressionCantonForm.get('id')!.value

      this.cantonService.delete(cantonId!)
        .subscribe({
          next: (value: Canton) => {
            this.getCantons()
            this.closeSuppressionCantonModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce canton a été supprimé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression du canton' })
          },
        })
    }
  }

  annulerSuppressionCanton(): void {
    this.closeSuppressionCantonModal()
  }

  // Modals
  openNouveauCantonModal(): void {
    this.showNouveauCantonModal = true
  }

  closeNouveauCantonModal(): void {
    this.showNouveauCantonModal = false
    this.nouveauCantonForm.reset()
  }

  openModificationCantonModal(index: number): void {
    const selectedCanton: Canton | undefined = this.listeCantons.data[index]

    if (selectedCanton != undefined) {
      this.getCommunes()
      this.modificationCantonForm.get('id')?.setValue(selectedCanton.id)
      this.modificationCantonForm.get('libelle')?.setValue(selectedCanton.libelle)
      this.modificationCantonForm.get('communeId')?.setValue(selectedCanton.communeId)
      this.modificationCantonForm.get('description')?.setValue(selectedCanton.description)

      this.showModificationCantonModal = true
    }
  }

  closeModificationCantonModal(): void {
    this.showModificationCantonModal = false
    this.modificationCantonForm.reset()
  }

  openSuppressionCantonModal(index: number): void {
    const selectedCanton: Canton | undefined = this.listeCantons.data[index]

    if (selectedCanton != undefined) {
      this.suppressionCantonForm.get('id')?.setValue(selectedCanton.id)

      this.showSuppressionCantonModal = true
    }
  }

  closeSuppressionCantonModal(): void {
    this.showSuppressionCantonModal = false
    this.suppressionCantonForm.reset()
  }


}
