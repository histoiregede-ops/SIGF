import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Profession } from '../../../../../data/modules/commun/models/Profession';
import { ProfessionService } from '../../../../../data/modules/commun/services/profession.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-professions-page',
  templateUrl: './liste-professions-page.component.html',
  styleUrl: './liste-professions-page.component.scss'
})
export class ListeProfessionsPageComponent {

  showNouvelleProfessionModal: boolean = false
  showModificationProfessionModal: boolean = false
  showSuppressionProfessionModal: boolean = false

  listeProfessions: PagingData<Profession> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }

  masquerfiltresListeProfessions: boolean = false
  filtresListeProfessionsForm: FormGroup = new FormGroup({
    search: new FormControl(null, []),
  })

  nouvelleProfessionForm: FormGroup = new FormGroup({
    libelle: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  modificationProfessionForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    libelle: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
  })

  suppressionProfessionForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private professionService: ProfessionService,
  ) {
    this.getProfessions()
  }

  getProfessions(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides(this.filtresListeProfessionsForm.value)

    this.professionService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Profession>) => {
          console.log(value)
          this.listeProfessions = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des professions' })
        }
      })
  }

  annulerRechercheProfession(): void {
    this.filtresListeProfessionsForm.get('search')!.setValue(null)
    this.filtrerListeProfessions()
  }

  filtrerListeProfessions(page?: number, paginationSize?: number): void {
    this.getProfessions({ page: this.listeProfessions.currentPage, paginationSize: this.listeProfessions.paginationSize! })
  }

  effacerFiltresListeProfessions(): void {
    this.filtresListeProfessionsForm.reset()

    this.filtrerListeProfessions()
  }

  validerCreationProfession(): void {
    this.nouvelleProfessionForm.markAllAsTouched()
    // console.log(this.nouvelleProfessionForm.value)
    if (this.nouvelleProfessionForm.valid) {
      let profession: Profession = this.nouvelleProfessionForm.value

      this.professionService.create(profession)
        .subscribe({
          next: (value: Profession) => {
            this.getProfessions()
            this.closeNouvelleProfessionModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette profession a été créée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if (err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une profession avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la création de la profession' })
            }
          },
        })
    }
  }

  annulerCreationProfession(): void {
    this.closeNouvelleProfessionModal()
  }

  validerModificationProfession(): void {
    console.log(this.modificationProfessionForm.value)
    this.modificationProfessionForm.markAllAsTouched()

    if (this.modificationProfessionForm.valid) {
      let profession: Profession = this.modificationProfessionForm.value

      this.professionService.update(profession)
        .subscribe({
          next: (value: Profession) => {
            this.getProfessions()
            this.closeModificationProfessionModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette profession a été mise à jour avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            if (err.error.alreadyExists) {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une profession avec le même libellé existe déjà' })
            }
            else {
              this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de la profession' })
            }
          },
        })
    }
  }

  annulerModificationProfession(): void {
    this.closeModificationProfessionModal()
  }

  validerSuppressionProfession(): void {
    console.log(this.suppressionProfessionForm.value)
    this.suppressionProfessionForm.markAllAsTouched()

    if (this.suppressionProfessionForm.valid) {
      let professionId: Profession['id'] = this.suppressionProfessionForm.get('id')!.value

      this.professionService.delete(professionId!)
        .subscribe({
          next: (value: Profession) => {
            this.getProfessions()
            this.closeSuppressionProfessionModal()

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cette profession a été supprimée avec succès' })
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)

            this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de la profession' })
          },
        })
    }
  }

  annulerSuppressionProfession(): void {
    this.closeSuppressionProfessionModal()
  }

  // Modals
  openNouvelleProfessionModal(): void {
    this.showNouvelleProfessionModal = true
  }

  closeNouvelleProfessionModal(): void {
    this.showNouvelleProfessionModal = false
    this.nouvelleProfessionForm.reset()
  }

  openModificationProfessionModal(index: number): void {
    const selectedProfession: Profession | undefined = this.listeProfessions.data[index]

    if (selectedProfession != undefined) {
      this.getProfessions()
      this.modificationProfessionForm.get('id')?.setValue(selectedProfession.id)
      this.modificationProfessionForm.get('libelle')?.setValue(selectedProfession.libelle)
      this.modificationProfessionForm.get('description')?.setValue(selectedProfession.description)

      this.showModificationProfessionModal = true
    }
  }

  closeModificationProfessionModal(): void {
    this.showModificationProfessionModal = false
    this.modificationProfessionForm.reset()
  }

  openSuppressionProfessionModal(index: number): void {
    const selectedProfession: Profession | undefined = this.listeProfessions.data[index]

    if (selectedProfession != undefined) {
      this.suppressionProfessionForm.get('id')?.setValue(selectedProfession.id)

      this.showSuppressionProfessionModal = true
    }
  }

  closeSuppressionProfessionModal(): void {
    this.showSuppressionProfessionModal = false
    this.suppressionProfessionForm.reset()
  }

}
