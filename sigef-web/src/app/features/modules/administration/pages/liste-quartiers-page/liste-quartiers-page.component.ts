import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Ville } from '../../../../../data/modules/commun/models/Ville';
import { Quartier } from '../../../../../data/modules/commun/models/Quartier';
import { VilleService } from '../../../../../data/modules/commun/services/ville.service';
import { QuartierService } from '../../../../../data/modules/commun/services/quartier.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-quartiers-page',
  templateUrl: './liste-quartiers-page.component.html',
  styleUrl: './liste-quartiers-page.component.scss'
})
export class ListeQuartiersPageComponent {
  
  showNouveauQuartierModal: boolean = false
  showModificationQuartierModal: boolean = false
  showSuppressionQuartierModal: boolean = false

  listeQuartiers: PagingData<Quartier> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  villes: Ville[] = []

  masquerfiltresListeQuartiers: boolean = false
  filtresListeQuartiersForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    ville: new FormControl(null, []),
  })

  nouveauQuartierForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    villeId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationQuartierForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    villeId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionQuartierForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private quartierService: QuartierService,
    private villeService: VilleService,
  ) {
    this.getQuartiers()
    this.getVilles()
  }

  getQuartiers(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeQuartiersForm.value)

    this.quartierService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Quartier>) => {
          console.log(value)
          this.listeQuartiers = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des quartiers' })
        }
      })
  }

  getVilles(): void {
    this.villeService.getAllData()
      .subscribe({
        next: (value: Ville[]) => {
          this.villes = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des villes' })
        }
      })
  }

  annulerRechercheQuartier(): void {
    this.filtresListeQuartiersForm.get('search')!.setValue(null)
    this.filtrerListeQuartiers()
  }

  filtrerListeQuartiers(page?: number, paginationSize?: number): void {
    this.getQuartiers({ page: this.listeQuartiers.currentPage, paginationSize: this.listeQuartiers.paginationSize! })
  }

  effacerFiltresListeQuartiers(): void {
    this.filtresListeQuartiersForm.reset()

    this.filtrerListeQuartiers()
  }

  validerCreationQuartier(): void {
    this.nouveauQuartierForm.markAllAsTouched()
    // console.log(this.nouveauQuartierForm.value)
    if (this.nouveauQuartierForm.valid) {
      let quartier: Quartier = this.nouveauQuartierForm.value

      this.quartierService.create(quartier)
        .subscribe({
          next: (value: Quartier) => {
            this.getQuartiers()
            this.closeNouveauQuartierModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce quartier a été créé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un quartier avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création du quartier' })
            }
          },
        })
    }
  }

  annulerCreationQuartier(): void {
    this.closeNouveauQuartierModal()
  }

  validerModificationQuartier(): void {
    console.log(this.modificationQuartierForm.value)
    this.modificationQuartierForm.markAllAsTouched()

    if (this.modificationQuartierForm.valid) {
      let quartier: Quartier = this.modificationQuartierForm.value

      this.quartierService.update(quartier)
        .subscribe({
          next: (value: Quartier) => {
            this.getQuartiers()
            this.closeModificationQuartierModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce quartier a été mis à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un quartier avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du quartier' })
            }
          },
        })
    }
  }

  annulerModificationQuartier(): void {
    this.closeModificationQuartierModal()
  }

  validerSuppressionQuartier(): void {
    console.log(this.suppressionQuartierForm.value)
    this.suppressionQuartierForm.markAllAsTouched()

    if (this.suppressionQuartierForm.valid) {
      let quartierId: Quartier['id'] = this.suppressionQuartierForm.get('id')!.value

      this.quartierService.delete(quartierId!)
        .subscribe({
          next: (value: Quartier) => {
            this.getQuartiers()
            this.closeSuppressionQuartierModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce quartier a été supprimé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression du quartier' })
          },
        })
    }
  }

  annulerSuppressionQuartier(): void {
    this.closeSuppressionQuartierModal()
  }

  // Modals
  openNouveauQuartierModal(): void {
    this.showNouveauQuartierModal = true
  }

  closeNouveauQuartierModal(): void {
    this.showNouveauQuartierModal = false
    this.nouveauQuartierForm.reset()
  }

  openModificationQuartierModal(index: number): void {
    const selectedQuartier: Quartier | undefined = this.listeQuartiers.data[index]

    if (selectedQuartier != undefined) {
      this.getVilles()
      this.modificationQuartierForm.get('id')?.setValue(selectedQuartier.id)
      this.modificationQuartierForm.get('libelle')?.setValue(selectedQuartier.libelle)
      this.modificationQuartierForm.get('villeId')?.setValue(selectedQuartier.villeId)
      this.modificationQuartierForm.get('description')?.setValue(selectedQuartier.description)

      this.showModificationQuartierModal = true
    }
  }

  closeModificationQuartierModal(): void {
    this.showModificationQuartierModal = false
    this.modificationQuartierForm.reset()
  }

  openSuppressionQuartierModal(index: number): void {
    const selectedQuartier: Quartier | undefined = this.listeQuartiers.data[index]

    if (selectedQuartier != undefined) {
      this.suppressionQuartierForm.get('id')?.setValue(selectedQuartier.id)

      this.showSuppressionQuartierModal = true
    }
  }

  closeSuppressionQuartierModal(): void {
    this.showSuppressionQuartierModal = false
    this.suppressionQuartierForm.reset()
  }

}
