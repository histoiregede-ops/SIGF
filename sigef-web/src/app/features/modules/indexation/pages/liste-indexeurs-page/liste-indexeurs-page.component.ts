import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagingData } from '../../../../../data/interfaces/PagingData';
import { Utilisateur } from '../../../../../data/modules/auth/models/Utilisateur';
import { IndexeurService } from '../../../../../data/modules/auth/services/indexeur.service';
import { PaginationEventData } from '../../../../../shared/components/custom-pagination-controls/custom-pagination-controls.component';
import { TypesNotificationAlert } from '../../../../../data/interfaces/NotificationAlert';
import { NotificationsHandlerService } from '../../../../../core/services/notifications-handler.service';
import { CustomMapType, FiltresDonneesUtils } from '../../../../../data/utils/FiltresDonneesUtils';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-liste-indexeurs-page',
  templateUrl: './liste-indexeurs-page.component.html',
  styleUrl: './liste-indexeurs-page.component.scss'
})
export class ListeIndexeursPageComponent {
  
  emptyError: boolean = false
  disableButton: boolean = false
  confirmError: boolean = false
  passwordError: boolean = false

  showModificationIndexeurModal: boolean = false
  showModificationActifIndexeurModal: boolean = false
  showChangementMotDePasseIndexeurModal: boolean = false

  listeIndexeurs: PagingData<Utilisateur> = {
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
    paginationSize: environment.PAGINATION_DEFAULT_SIZE
  }
  rechercheIndexeur?: string

  modificationIndexeurForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    identifiant: new FormControl({ value: null, disabled: true }, [Validators.required]),
    nom: new FormControl(null, [Validators.required]),
    prenoms: new FormControl(null, [Validators.required]),
    email: new FormControl({ value: null, disabled: true }, [Validators.email, Validators.required]),
    contact: new FormControl(null, [Validators.required, Validators.minLength(11)]),
  })

  modificationActifIndexeurForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    nom: new FormControl({ value: null, disabled: true }, [Validators.required]),
    prenoms: new FormControl({ value: null, disabled: true }, [Validators.required]),
    actif: new FormControl({ value: null, disabled: true }, [Validators.required]),
  })

  changementMotDePasseIndexeurForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    identifiant: new FormControl({ value: null, disabled: true }, [Validators.required]),
    nom: new FormControl({ value: null, disabled: true }, [Validators.required]),
    prenoms: new FormControl({ value: null, disabled: true }, [Validators.required]),
    email: new FormControl({ value: null, disabled: true }, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  })

  constructor(
    private router: Router,
    private notificationsHandlerService: NotificationsHandlerService,
    private indexeurService: IndexeurService
  ) {
    this.getIndexeurs()
  }

  getIndexeurs(event: PaginationEventData = { page: 0, paginationSize: 10 }): void {
    const filtres: CustomMapType = FiltresDonneesUtils.getInstance().nettoyerChampsVides({search: this.rechercheIndexeur ?? ''})

    this.indexeurService.getAll(event.page, event.paginationSize, filtres)
      .subscribe({
        next: (value: PagingData<Utilisateur>) => {
          // console.log(value)
          this.listeIndexeurs = value
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la récupération de la liste des indexeurs' })
        }
      })
  }

  rechercherIndexeur(): void {
    this.getIndexeurs({page: this.listeIndexeurs.currentPage, paginationSize: this.listeIndexeurs.paginationSize!})
  }

  annulerRechercheIndexeur(): void {
    this.rechercheIndexeur = undefined
    this.rechercherIndexeur()
  }


  validerModificationIndexeur(): void {
    console.log(this.modificationIndexeurForm.value)
    if (this.modificationIndexeurForm.valid) {
      let utilisateur = new Utilisateur()
      utilisateur.id = this.modificationIndexeurForm.get('id')!.value
      utilisateur.nom = this.modificationIndexeurForm.get('nom')!.value
      utilisateur.prenoms = this.modificationIndexeurForm.get('prenoms')!.value
      utilisateur.contact = this.modificationIndexeurForm.get('contact')!.value

      this.indexeurService.update(utilisateur)
        .subscribe(
          {
            next: (res) => {
              this.disableButton = false
              this.closeModificationIndexeurModal()
              this.getIndexeurs()
              // this.router.navigateByUrl("/auth/connexion")
              this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Cet utilisateur a été mis à jour avec succès'})
            },
            error: (err: HttpErrorResponse) => {
              console.log(err.error)
              this.disableButton = false

              if(err.error.emailAlreadyUsed == true) {
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Cet email est déjà utilisé par un autre utilisateur' })
              }
              if(err.error.identifiantAlreadyUsed == true) {
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Cet identifiant est déjà utilisé par un autre utilisateur' })
              }
              if(err.error.nomPrenomsAlreadyUsed == true) {
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Ces nom et prénoms sont déjà utilisés par un autre utilisateur' })
              }
              
              if (err.error.emailAlreadyUsed == false && err.error.identifiantAlreadyUsed == false && err.error.nomPrenomsAlreadyUsed == false) {
                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour' })
              }
            }
          }
        )
    }
  }

  annulerModificationIndexeur(): void {
    this.closeModificationIndexeurModal()
  }

  validerModificationActifIndexeur(): void {
    console.log(this.modificationActifIndexeurForm.value)
    if (this.modificationActifIndexeurForm.valid) {
      const indexeurId = this.modificationActifIndexeurForm.get('id')!.value

      if (indexeurId) {
        this.indexeurService.updateActif(indexeurId)
          .subscribe(
            {
              next: (res) => {
                this.closeModificationActifIndexeurModal()
                this.getIndexeurs()
                // this.router.navigateByUrl("/auth/connexion")
                this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'L\'état du compte de cet utilisateur a été mis à jour avec succès'})
              },
              error: (err: HttpErrorResponse) => {
                console.log(err.error)
                this.disableButton = false

                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour' })
              },
            }
          )
      }
    }
  }

  annulerModificationActifIndexeur(): void {
    this.closeModificationActifIndexeurModal()
  }

  validerChangementMotDePasseIndexeur(): void {
    this.changementMotDePasseIndexeurForm.markAllAsTouched()
    console.log(this.changementMotDePasseIndexeurForm.valid, this.changementMotDePasseIndexeurForm.value)

    if (this.changementMotDePasseIndexeurForm.valid) {
      this.disableButton = true

      let password: string = this.changementMotDePasseIndexeurForm.get('password')?.value
      let confirmPassword: string = this.changementMotDePasseIndexeurForm.get('confirmPassword')?.value
      console.log((password != confirmPassword))

      if (password != confirmPassword) {
        this.confirmError = true
        setTimeout(() => {
          this.confirmError = false
        }, 3000)
        this.disableButton = false
      }
      else {
        let utilisateur = new Utilisateur()
        utilisateur.id = this.changementMotDePasseIndexeurForm.get('id')?.value
        utilisateur.motDePasse = password

        this.indexeurService.updateMotDePasse(utilisateur)
          .subscribe(
            {
              next: (res) => {
                this.disableButton = false
                this.closeChangementMotDePasseIndexeurModal()
                this.getIndexeurs()
                this.notificationsHandlerService.addNotification({type: TypesNotificationAlert.SUCCESS, title: 'Opération réussie', description: 'Le mot de passe de cet utilisateur a été mis à jour avec succès'})
              },
              error: (err: HttpErrorResponse) => {
                console.log(err.error)
                this.disableButton = false

                this.notificationsHandlerService.addNotification({ type: TypesNotificationAlert.DANGER, title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour du mot de passe' })
              },
            }
          )
      }
    }
  }

  annulerChangementMotDePasseIndexeur(): void {
    this.closeChangementMotDePasseIndexeurModal()
  }

  // Modals
  openModificationIndexeurModal(index: number): void {
    const selectedIndexeur: Utilisateur | undefined = this.listeIndexeurs.data[index]

    if (selectedIndexeur != undefined) {
      this.modificationIndexeurForm.get('id')?.setValue(selectedIndexeur.id)
      this.modificationIndexeurForm.get('identifiant')?.setValue(selectedIndexeur.identifiant)
      this.modificationIndexeurForm.get('nom')?.setValue(selectedIndexeur.nom)
      this.modificationIndexeurForm.get('prenoms')?.setValue(selectedIndexeur.prenoms)
      this.modificationIndexeurForm.get('email')?.setValue(selectedIndexeur.email)
      this.modificationIndexeurForm.get('contact')?.setValue(selectedIndexeur.contact)

      this.showModificationIndexeurModal = true
    }
  }

  closeModificationIndexeurModal(): void {
    this.showModificationIndexeurModal = false
    this.modificationIndexeurForm.reset()
  }

  openModificationActifIndexeurModal(index: number): void {
    const selectedIndexeur: Utilisateur | undefined = this.listeIndexeurs.data[index]

    if (selectedIndexeur != undefined) {
      this.modificationActifIndexeurForm.get('id')?.setValue(selectedIndexeur.id)
      this.modificationActifIndexeurForm.get('nom')?.setValue(selectedIndexeur.nom)
      this.modificationActifIndexeurForm.get('prenoms')?.setValue(selectedIndexeur.prenoms)
      this.modificationActifIndexeurForm.get('actif')?.setValue(selectedIndexeur.actif)

      this.showModificationActifIndexeurModal = true
    }
  }

  closeModificationActifIndexeurModal(): void {
    this.showModificationActifIndexeurModal = false
    this.modificationActifIndexeurForm.reset()
  }

  openChangementMotDePasseIndexeurModal(index: number): void {
    const selectedIndexeur: Utilisateur | undefined = this.listeIndexeurs.data[index]

    if (selectedIndexeur != undefined) {
      this.changementMotDePasseIndexeurForm.get('id')?.setValue(selectedIndexeur.id)
      this.changementMotDePasseIndexeurForm.get('identifiant')?.setValue(selectedIndexeur.identifiant)
      this.changementMotDePasseIndexeurForm.get('email')?.setValue(selectedIndexeur.email)
      this.changementMotDePasseIndexeurForm.get('nom')?.setValue(selectedIndexeur.nom)
      this.changementMotDePasseIndexeurForm.get('prenoms')?.setValue(selectedIndexeur.prenoms)

      this.showChangementMotDePasseIndexeurModal = true
    }
  }

  closeChangementMotDePasseIndexeurModal(): void {
    this.showChangementMotDePasseIndexeurModal = false
    this.changementMotDePasseIndexeurForm.reset()
  }
}
