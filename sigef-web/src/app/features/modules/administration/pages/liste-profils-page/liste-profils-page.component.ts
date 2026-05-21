import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { ProfilService } from '../../../../../data/modules/auth/services/profil.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { Profil } from '../../../../../data/modules/auth/models/Profil';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-profils-page',
  templateUrl: './liste-profils-page.component.html',
  styleUrl: './liste-profils-page.component.scss'
})
export class ListeProfilsPageComponent {
  
  showNouveauProfilModal: boolean = false
  showModificationProfilModal: boolean = false
  showSuppressionProfilModal: boolean = false

  listeProfils: PagingData<Profil> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListeProfils: boolean = false
  filtresListeProfilsForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
  })

  nouveauProfilForm: FormGroup = new FormGroup({
    titre: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationProfilForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    titre: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionProfilForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private profilService: ProfilService,
  ) {
    this.getProfils()
  }

  getProfils(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeProfilsForm.value)

    this.profilService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Profil>) => {
          console.log(value)
          this.listeProfils = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des profils' })
        }
      })
  }

  annulerRechercheProfil(): void {
    this.filtresListeProfilsForm.get('search')!.setValue(null)
    this.filtrerListeProfils()
  }

  filtrerListeProfils(page?: number, paginationSize?: number): void {
    this.getProfils({ page: this.listeProfils.currentPage, paginationSize: this.listeProfils.paginationSize! })
  }

  effacerFiltresListeProfils(): void {
    this.filtresListeProfilsForm.reset()

    this.filtrerListeProfils()
  }

  validerCreationProfil(): void {
    this.nouveauProfilForm.markAllAsTouched()
    // console.log(this.nouveauProfilForm.value)
    if (this.nouveauProfilForm.valid) {
      let profil: Profil = this.nouveauProfilForm.value

      this.profilService.create(profil)
        .subscribe({
          next: (value: Profil) => {
            this.getProfils()
            this.closeNouveauProfilModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce profil a été créé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un profil avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création du profil' })
            }
          },
        })
    }
  }

  annulerCreationProfil(): void {
    this.closeNouveauProfilModal()
  }

  validerModificationProfil(): void {
    console.log(this.modificationProfilForm.value)
    this.modificationProfilForm.markAllAsTouched()

    if (this.modificationProfilForm.valid) {
      let profil: Profil = this.modificationProfilForm.value

      this.profilService.update(profil)
        .subscribe({
          next: (value: Profil) => {
            this.getProfils()
            this.closeModificationProfilModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce profil a été mis à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if(err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Un profil avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du profil' })
            }
          },
        })
    }
  }

  annulerModificationProfil(): void {
    this.closeModificationProfilModal()
  }

  validerSuppressionProfil(): void {
    console.log(this.suppressionProfilForm.value)
    this.suppressionProfilForm.markAllAsTouched()

    if (this.suppressionProfilForm.valid) {
      let profilId: Profil['id'] = this.suppressionProfilForm.get('id')!.value

      this.profilService.delete(profilId!.toString())
        .subscribe({
          next: (value: Profil) => {
            this.getProfils()
            this.closeSuppressionProfilModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Ce profil a été supprimé avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression du profil' })
          },
        })
    }
  }

  annulerSuppressionProfil(): void {
    this.closeSuppressionProfilModal()
  }

  // Modals
  openNouveauProfilModal(): void {
    this.showNouveauProfilModal = true
  }

  closeNouveauProfilModal(): void {
    this.showNouveauProfilModal = false
    this.nouveauProfilForm.reset()
  }

  openModificationProfilModal(index: number): void {
    const selectedProfil: Profil | undefined = this.listeProfils.data[index]

    if (selectedProfil != undefined) {
      this.modificationProfilForm.get('id')?.setValue(selectedProfil.id)
      this.modificationProfilForm.get('titre')?.setValue(selectedProfil.titre)
      this.modificationProfilForm.get('description')?.setValue(selectedProfil.description)

      this.showModificationProfilModal = true
    }
  }

  closeModificationProfilModal(): void {
    this.showModificationProfilModal = false
    this.modificationProfilForm.reset()
  }

  openSuppressionProfilModal(index: number): void {
    const selectedProfil: Profil | undefined = this.listeProfils.data[index]

    if (selectedProfil != undefined) {
      this.suppressionProfilForm.get('id')?.setValue(selectedProfil.id)

      this.showSuppressionProfilModal = true
    }
  }

  closeSuppressionProfilModal(): void {
    this.showSuppressionProfilModal = false
    this.suppressionProfilForm.reset()
  }

}
