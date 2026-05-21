import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Canton } from '../../../../../data/modules/commun/models/Canton';
import { Ville } from '../../../../../data/modules/commun/models/Ville';
import { CantonService } from '../../../../../data/modules/commun/services/canton.service';
import { VilleService } from '../../../../../data/modules/commun/services/ville.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-villes-page',
  templateUrl: './liste-villes-page.component.html',
  styleUrl: './liste-villes-page.component.scss'
})
export class ListeVillesPageComponent {
  
  showNouvelleVilleModal: boolean = false
  showModificationVilleModal: boolean = false
  showSuppressionVilleModal: boolean = false

  listeVilles: PagingData<Ville> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  cantons: Canton[] = []

  masquerfiltresListeVilles: boolean = false
  filtresListeVillesForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
    canton: new FormControl(null, []),
  })

  nouvelleVilleForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    cantonId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationVilleForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    cantonId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionVilleForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private villeService: VilleService,
    private cantonService: CantonService,
  ) {
    this.getVilles()
    this.getCantons()
  }

  getVilles(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeVillesForm.value)

    this.villeService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Ville>) => {
          console.log(value)
          this.listeVilles = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des villes' })
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

  annulerRechercheVille(): void {
    this.filtresListeVillesForm.get('search')!.setValue(null)
    this.filtrerListeVilles()
  }

  filtrerListeVilles(page?: number, paginationSize?: number): void {
    this.getVilles({ page: this.listeVilles.currentPage, paginationSize: this.listeVilles.paginationSize! })
  }

  effacerFiltresListeVilles(): void {
    this.filtresListeVillesForm.reset()

    this.filtrerListeVilles()
  }

  validerCreationVille(): void {
    this.nouvelleVilleForm.markAllAsTouched()
    // console.log(this.nouvelleVilleForm.value)
    if (this.nouvelleVilleForm.valid) {
      let ville: Ville = this.nouvelleVilleForm.value

      this.villeService.create(ville)
        .subscribe({
          next: (value: Ville) => {
            this.getVilles()
            this.closeNouvelleVilleModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette ville a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une ville avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de la ville' })
            }
          },
        })
    }
  }

  annulerCreationVille(): void {
    this.closeNouvelleVilleModal()
  }

  validerModificationVille(): void {
    console.log(this.modificationVilleForm.value)
    this.modificationVilleForm.markAllAsTouched()

    if (this.modificationVilleForm.valid) {
      let ville: Ville = this.modificationVilleForm.value

      this.villeService.update(ville)
        .subscribe({
          next: (value: Ville) => {
            this.getVilles()
            this.closeModificationVilleModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette ville a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une ville avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la ville' })
            }
          },
        })
    }
  }

  annulerModificationVille(): void {
    this.closeModificationVilleModal()
  }

  validerSuppressionVille(): void {
    console.log(this.suppressionVilleForm.value)
    this.suppressionVilleForm.markAllAsTouched()

    if (this.suppressionVilleForm.valid) {
      let villeId: Ville['id'] = this.suppressionVilleForm.get('id')!.value

      this.villeService.delete(villeId!)
        .subscribe({
          next: (value: Ville) => {
            this.getVilles()
            this.closeSuppressionVilleModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette ville a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la ville' })
          },
        })
    }
  }

  annulerSuppressionVille(): void {
    this.closeSuppressionVilleModal()
  }

  // Modals
  openNouvelleVilleModal(): void {
    this.showNouvelleVilleModal = true
  }

  closeNouvelleVilleModal(): void {
    this.showNouvelleVilleModal = false
    this.nouvelleVilleForm.reset()
  }

  openModificationVilleModal(index: number): void {
    const selectedVille: Ville | undefined = this.listeVilles.data[index]

    if (selectedVille != undefined) {
      this.getCantons()
      this.modificationVilleForm.get('id')?.setValue(selectedVille.id)
      this.modificationVilleForm.get('libelle')?.setValue(selectedVille.libelle)
      this.modificationVilleForm.get('cantonId')?.setValue(selectedVille.cantonId)
      this.modificationVilleForm.get('description')?.setValue(selectedVille.description)

      this.showModificationVilleModal = true
    }
  }

  closeModificationVilleModal(): void {
    this.showModificationVilleModal = false
    this.modificationVilleForm.reset()
  }

  openSuppressionVilleModal(index: number): void {
    const selectedVille: Ville | undefined = this.listeVilles.data[index]

    if (selectedVille != undefined) {
      this.suppressionVilleForm.get('id')?.setValue(selectedVille.id)

      this.showSuppressionVilleModal = true
    }
  }

  closeSuppressionVilleModal(): void {
    this.showSuppressionVilleModal = false
    this.suppressionVilleForm.reset()
  }

}
