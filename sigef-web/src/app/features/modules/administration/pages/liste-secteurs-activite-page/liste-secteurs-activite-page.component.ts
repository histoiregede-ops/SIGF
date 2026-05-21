import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { SecteurActivite } from '../../../../../data/modules/commun/models/SecteurActivite';
import { SecteurActiviteService } from '../../../../../data/modules/commun/services/secteur-activite.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-secteurs-activite-page',
  templateUrl: './liste-secteurs-activite-page.component.html',
  styleUrl: './liste-secteurs-activite-page.component.scss'
})
export class ListeSecteursActivitePageComponent {

  showNouveauSecteurActiviteModal: boolean = false
  showModificationSecteurActiviteModal: boolean = false
  showSuppressionSecteurActiviteModal: boolean = false

  listeSecteursActivite: PagingData<SecteurActivite> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListeSecteursActivite: boolean = false
  filtresListeSecteursActiviteForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
  })

  nouveauSecteurActiviteForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationSecteurActiviteForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionSecteurActiviteForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private secteurActiviteService: SecteurActiviteService,
  ) {
    this.getSecteursActivite()
  }

  getSecteursActivite(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeSecteursActiviteForm.value)

    this.secteurActiviteService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<SecteurActivite>) => {
          console.log(value)
          this.listeSecteursActivite = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des secteurs d\'activité' })
        }
      })
  }

  annulerRechercheSecteurActivite(): void {
    this.filtresListeSecteursActiviteForm.get('search')!.setValue(null)
    this.filtrerListeSecteursActivite()
  }

  filtrerListeSecteursActivite(page?: number, paginationSize?: number): void {
    this.getSecteursActivite({ page: this.listeSecteursActivite.currentPage, paginationSize: this.listeSecteursActivite.paginationSize! })
  }

  effacerFiltresListeSecteursActivite(): void {
    this.filtresListeSecteursActiviteForm.reset()

    this.filtrerListeSecteursActivite()
  }

  validerCreationSecteurActivite(): void {
    this.nouveauSecteurActiviteForm.markAllAsTouched()
    // console.log(this.nouveauSecteurActiviteForm.value)
    if (this.nouveauSecteurActiviteForm.valid) {
      let secteurActivite: SecteurActivite = this.nouveauSecteurActiviteForm.value

      this.secteurActiviteService.create(secteurActivite)
        .subscribe({
          next: (value: SecteurActivite) => {
            this.getSecteursActivite()
            this.closeNouveauSecteurActiviteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce secteur d\'activité a été créé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un secteur d\'activité avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création du secteur d\'activité' })
            }
          },
        })
    }
  }

  annulerCreationSecteurActivite(): void {
    this.closeNouveauSecteurActiviteModal()
  }

  validerModificationSecteurActivite(): void {
    console.log(this.modificationSecteurActiviteForm.value)
    this.modificationSecteurActiviteForm.markAllAsTouched()

    if (this.modificationSecteurActiviteForm.valid) {
      let secteurActivite: SecteurActivite = this.modificationSecteurActiviteForm.value

      this.secteurActiviteService.update(secteurActivite)
        .subscribe({
          next: (value: SecteurActivite) => {
            this.getSecteursActivite()
            this.closeModificationSecteurActiviteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce secteur d\'activité a été mis à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un secteur d\'activité avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du secteur d\'activité' })
            }
          },
        })
    }
  }

  annulerModificationSecteurActivite(): void {
    this.closeModificationSecteurActiviteModal()
  }

  validerSuppressionSecteurActivite(): void {
    console.log(this.suppressionSecteurActiviteForm.value)
    this.suppressionSecteurActiviteForm.markAllAsTouched()

    if (this.suppressionSecteurActiviteForm.valid) {
      let secteurActiviteId: SecteurActivite['id'] = this.suppressionSecteurActiviteForm.get('id')!.value

      this.secteurActiviteService.delete(secteurActiviteId!)
        .subscribe({
          next: (value: SecteurActivite) => {
            this.getSecteursActivite()
            this.closeSuppressionSecteurActiviteModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce secteur d\'activité a été supprimé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression du secteur d\'activité' })
          },
        })
    }
  }

  annulerSuppressionSecteurActivite(): void {
    this.closeSuppressionSecteurActiviteModal()
  }

  // Modals
  openNouveauSecteurActiviteModal(): void {
    this.showNouveauSecteurActiviteModal = true
  }

  closeNouveauSecteurActiviteModal(): void {
    this.showNouveauSecteurActiviteModal = false
    this.nouveauSecteurActiviteForm.reset()
  }

  openModificationSecteurActiviteModal(index: number): void {
    const selectedSecteurActivite: SecteurActivite | undefined = this.listeSecteursActivite.data[index]

    if (selectedSecteurActivite != undefined) {
      this.modificationSecteurActiviteForm.get('id')?.setValue(selectedSecteurActivite.id)
      this.modificationSecteurActiviteForm.get('libelle')?.setValue(selectedSecteurActivite.libelle)
      this.modificationSecteurActiviteForm.get('description')?.setValue(selectedSecteurActivite.description)

      this.showModificationSecteurActiviteModal = true
    }
  }

  closeModificationSecteurActiviteModal(): void {
    this.showModificationSecteurActiviteModal = false
    this.modificationSecteurActiviteForm.reset()
  }

  openSuppressionSecteurActiviteModal(index: number): void {
    const selectedSecteurActivite: SecteurActivite | undefined = this.listeSecteursActivite.data[index]

    if (selectedSecteurActivite != undefined) {
      this.suppressionSecteurActiviteForm.get('id')?.setValue(selectedSecteurActivite.id)

      this.showSuppressionSecteurActiviteModal = true
    }
  }

  closeSuppressionSecteurActiviteModal(): void {
    this.showSuppressionSecteurActiviteModal = false
    this.suppressionSecteurActiviteForm.reset()
  }

}
